import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// ---- Supabase admin client ----
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// ---- OpenAI client ----
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * Safe, border-free, margin-protected coloring page prompt (5% margins)
 */
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

/**
 * Categorization & Tagging Logic
 */
async function autoCategorizeAndTag(prompt: string): Promise<{
  category: string;
  tags: string[];
}> {
  const categories = [
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
${categories.join(", ")}

Also return 3–7 short tags.

Respond ONLY in JSON:
{"category":"...","tags":["...","..."]}
          `.trim(),
        },
        { role: "user", content: prompt },
      ],
    });

    const text = resp.choices[0]?.message?.content?.trim() || "";
    const parsed = JSON.parse(text);

    const category = categories.includes(parsed.category)
      ? parsed.category
      : "Uncategorized";

    const tags = Array.isArray(parsed.tags)
      ? parsed.tags.map((t: any) => String(t).slice(0, 30))
      : [];

    return { category, tags };
  } catch {
    return { category: "Uncategorized", tags: [] };
  }
}

/**
 * POST — Generate → Upload → Store
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // 1) Auto category + tags
    const { category, tags } = await autoCategorizeAndTag(prompt);

    // 2) Build margin-safe prompt
    const enhancedPrompt = buildSafeMarginPrompt(prompt);

    // 3) Generate portrait 1024x1536 coloring page
    const imageResponse = await openai.images.generate({
      model: "gpt-image-1",
      prompt: enhancedPrompt,
      size: "1024x1536",
      n: 1,
    });

    const b64 = imageResponse.data?.[0]?.b64_json;
    if (!b64) {
      return NextResponse.json(
        { error: "No image returned from OpenAI." },
        { status: 500 }
      );
    }

    const imageBuffer = Buffer.from(b64, "base64");

    // 4) Upload to Supabase Storage
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
      return NextResponse.json(
        { error: "Failed to upload image to storage." },
        { status: 500 }
      );
    }

    // 5) Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("coloring-pages")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // 6) Insert row into DB
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
      return NextResponse.json(
        { error: "Database insert failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ image: row }, { status: 200 });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
