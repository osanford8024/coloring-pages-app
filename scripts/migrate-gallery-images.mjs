import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";

loadEnvFile(".env.local");
loadEnvFile(".env.migration.local");

const oldUrl = requireEnv("OLD_SUPABASE_URL");
const oldServiceRoleKey = requireEnv("OLD_SUPABASE_SERVICE_ROLE_KEY");
const newUrl =
  process.env.NEW_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const newServiceRoleKey =
  process.env.NEW_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!newUrl || !newServiceRoleKey) {
  throw new Error(
    "Missing NEW_SUPABASE_URL/NEW_SUPABASE_SERVICE_ROLE_KEY or current NEXT_PUBLIC_SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY."
  );
}

const oldTable = process.env.OLD_SUPABASE_IMAGES_TABLE || "images";
const newTable = process.env.NEW_SUPABASE_IMAGES_TABLE || "images";
const newBucket = process.env.NEW_SUPABASE_STORAGE_BUCKET || "coloring-pages";
const oldImageColumn = process.env.OLD_SUPABASE_IMAGE_URL_COLUMN || "image_url";
const oldPromptColumn = process.env.OLD_SUPABASE_PROMPT_COLUMN || "prompt";
const oldCategoryColumn =
  process.env.OLD_SUPABASE_CATEGORY_COLUMN || "category";
const oldTagsColumn = process.env.OLD_SUPABASE_TAGS_COLUMN || "tags";
const limit = Number(process.env.MIGRATION_LIMIT || "0");
const dryRun = process.argv.includes("--dry-run");

const oldSupabase = createClient(oldUrl, oldServiceRoleKey, {
  auth: { persistSession: false },
});

const newSupabase = createClient(newUrl, newServiceRoleKey, {
  auth: { persistSession: false },
});

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

async function main() {
  console.log(`Reading old rows from ${oldTable}...`);
  const rows = await readAllOldRows();

  console.log(`Found ${rows.length} old rows.`);
  if (dryRun) console.log("Dry run enabled. No uploads or inserts will happen.");

  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (const [index, row] of rows.entries()) {
    const imageUrl = getString(row, oldImageColumn);
    const prompt = getString(row, oldPromptColumn) || "Imported coloring page";
    const createdAt =
      getString(row, oldCreatedAtColumn) || new Date().toISOString();
    const category = getString(row, oldCategoryColumn) || "Uncategorized";
    const tags = normalizeTags(row[oldTagsColumn]);

    if (!imageUrl) {
      skipped += 1;
      console.warn(`Skipping row ${index + 1}: missing ${oldImageColumn}.`);
      continue;
    }

    const duplicate = await findDuplicate(prompt, createdAt);
    if (duplicate) {
      skipped += 1;
      console.log(`Skipping duplicate: ${prompt.slice(0, 80)}`);
      continue;
    }

    try {
      console.log(`Importing ${index + 1}/${rows.length}: ${prompt.slice(0, 80)}`);

      if (dryRun) {
        imported += 1;
        continue;
      }

      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error(`Image download failed (${imageResponse.status})`);
      }

      const contentType =
        imageResponse.headers.get("content-type") || "image/png";
      const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
      const storagePath = buildStoragePath(row, imageUrl, contentType);

      const { error: uploadError } = await newSupabase.storage
        .from(newBucket)
        .upload(storagePath, imageBuffer, {
          contentType,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = newSupabase.storage
        .from(newBucket)
        .getPublicUrl(storagePath);

      const { error: insertError } = await newSupabase.from(newTable).insert({
        prompt,
        image_url: publicUrlData.publicUrl,
        category,
        tags,
        created_at: createdAt,
      });

      if (insertError) throw insertError;

      imported += 1;
    } catch (err) {
      failed += 1;
      console.error(`Failed row ${index + 1}:`, err);
    }
  }

  console.log("");
  console.log("Migration complete.");
  console.log(`Imported: ${imported}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
}

async function readAllOldRows() {
  const pageSize = 100;
  let offset = 0;
  const rows = [];

  while (true) {
    const pageLimit = limit > 0 ? Math.min(pageSize, limit - rows.length) : pageSize;
    if (pageLimit <= 0) break;

    let query = oldSupabase
      .from(oldTable)
      .select("*")
      .range(offset, offset + pageLimit - 1);

    if (oldCreatedAtColumn) {
      query = query.order(oldCreatedAtColumn, { ascending: true });
    }

    let { data, error } = await query;

    if (error && oldCreatedAtColumn) {
      console.warn(
        `Ordered read failed with ${oldCreatedAtColumn}; retrying without ordering.`
      );
      const fallback = await oldSupabase
        .from(oldTable)
        .select("*")
        .range(offset, offset + pageLimit - 1);

      data = fallback.data;
      error = fallback.error;
    }

    if (error) throw error;
    if (!data || data.length === 0) break;

    rows.push(...data);
    offset += data.length;

    if (data.length < pageLimit) break;
    if (limit > 0 && rows.length >= limit) break;
  }

  return rows;
}

async function findDuplicate(prompt, createdAt) {
  const { data, error } = await newSupabase
    .from(newTable)
    .select("id")
    .eq("prompt", prompt)
    .eq("created_at", createdAt)
    .limit(1);

  if (error) {
    console.warn("Duplicate check failed; continuing:", error.message);
    return false;
  }

  return Boolean(data?.length);
}

function buildStoragePath(row, imageUrl, contentType) {
  const category = sanitizePathPart(getString(row, oldCategoryColumn) || "Imported");
  const id = sanitizePathPart(getString(row, "id") || crypto.randomUUID());
  const urlExtension = extname(new URL(imageUrl).pathname);
  const extension = urlExtension || extensionFromContentType(contentType);
  return `imported/${category}/${id}${extension}`;
}

function extensionFromContentType(contentType) {
  if (contentType.includes("jpeg")) return ".jpg";
  if (contentType.includes("webp")) return ".webp";
  return ".png";
}

function normalizeTags(value) {
  if (Array.isArray(value)) return value.map((tag) => String(tag));
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function getString(row, key) {
  const value = row?.[key];
  if (value === null || value === undefined) return "";
  return String(value);
}

function sanitizePathPart(value) {
  return value
    .trim()
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "imported";
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const content = readFileSync(path, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;

    process.env[key] = rawValue
      .trim()
      .replace(/^[ '\"]|[ '\"]$/g, "");
  }
}

function requireEnv(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing ${key}`);
  return value;
}