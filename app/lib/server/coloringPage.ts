import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const CATEGORIES = [
  "Animals",
  "People",
  "Fantasy",
  "Sports",
  "Cars",
  "Food",
  "Dinosaurs",
  "Space",
  "Flowers",
  "Uncategorized",
];

type GeneratedImageRow = {
  id: string;
  prompt: string;
  image_url: string;
  category: string;
  tags: string[];
  created_at?: string;
};

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  return new OpenAI({ apiKey });
}

export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

function buildSafeMarginPrompt(userPrompt: string) {
  return `
Create a black-and-white coloring page in cartoon line art.

FORMAT:
- Portrait layout (1024x1536).
- Do NOT draw any borders, boxes, frames, or outlines around the page.
- Keep the drawing comfortably inside the page with clear space on all sides.
- Leave a small blank white margin (about 10% of the page) on every edge.
- Nothing may touch or come close to the edges of the page.
- Do NOT zoom in. Do NOT fill the entire page.
- Keep the subject centered and sized appropriately, leaving clean breathing room around it.
- Use bold, clean black outlines only. No shading, no grayscale, no colors.
- Plain white background.

CONTENT:
${userPrompt}
  `.trim();
}

async function autoCategorizeAndTag(
  openai: OpenAI,
  prompt: string
): Promise<{
  category: string;
  tags: string[];
}> {
  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `
You categorize coloring page prompts.
Pick exactly ONE category from this list:
${CATEGORIES.join(", ")}

Also return 3-7 short tags.

Respond ONLY in JSON:
{"category":"...","tags":["...","..."]}
          `.trim(),
        },
        { role: "user", content: prompt },
      ],
    });

    const text = resp.choices[0]?.message?.content?.trim() || "";
    const parsed = JSON.parse(text);

    const category = CATEGORIES.includes(parsed.category)
      ? parsed.category
      : "Uncategorized";

    const tags = Array.isArray(parsed.tags)
      ? parsed.tags.map((tag: unknown) => String(tag).slice(0, 30))
      : [];

    return { category, tags };
  } catch {
    return { category: "Uncategorized", tags: [] };
  }
}

export async function generateAndStoreColoringPage(
  prompt: string
): Promise<GeneratedImageRow> {
  const openai = getOpenAIClient();
  const supabaseAdmin = getSupabaseAdminClient();

  const { category, tags } = await autoCategorizeAndTag(openai, prompt);
  const enhancedPrompt = buildSafeMarginPrompt(prompt);

  const imageResponse = await openai.images.generate({
    model: "gpt-image-1",
    prompt: enhancedPrompt,
    size: "1024x1536",
    output_format: "png",
    n: 1,
  });

  const b64 = imageResponse.data?.[0]?.b64_json;

  if (!b64) {
    console.error("OpenAI image response did not include b64_json:", {
      created: imageResponse.created,
      outputCount: imageResponse.data?.length ?? 0,
      usage: imageResponse.usage,
    });

    throw new Error("No image returned from OpenAI.");
  }

  const imageBuffer = Buffer.from(b64, "base64");
  const safeCategory = (category || "Uncategorized").replace(/\s+/g, "-");
  const fileName = `${safeCategory}/image_${Date.now()}.png`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("coloring-pages")
    .upload(fileName, imageBuffer, {
      contentType: "image/png",
      upsert: false,
    });

  if (uploadError) {
    console.error("Supabase upload error:", uploadError);
    throw new Error("Failed to upload image to storage.");
  }

  const { data: urlData } = supabaseAdmin.storage
    .from("coloring-pages")
    .getPublicUrl(fileName);

  const publicUrl = urlData.publicUrl;

  const { data: row, error: insertError } = await supabaseAdmin
    .from("images")
    .insert({
      prompt,
      image_url: publicUrl,
      category,
      tags,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    throw new Error("Database insert failed.");
  }

  return row as GeneratedImageRow;
}
