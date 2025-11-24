import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// ---- Supabase admin client (service role) ----
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false },
  }
);

// ---- OpenAI client ----
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Helper: keep image inside frame
function buildEnhancedPrompt(userPrompt: string) {
  return `
Black-and-white coloring page, thick clean outlines, no shading, no gray.
Single main subject centered.
Entire subject fully visible inside the frame with generous margin.
Do not crop or cut off any part of the subject.
Leave whitespace around edges.
Simple background if any.
Subject: ${userPrompt}
`.trim();
}

// Helper: auto-categorize + tags (safe JSON)
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
You are categorizing coloring page prompts.
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

    const tags =
      Array.isArray(parsed.tags) && parsed.tags.length
        ? parsed.tags.map((t: any) => String(t).slice(0, 30))
        : [];

    return { category, tags };
  } catch (e) {
    // Fallback if JSON parse fails
    return { category: "Uncategorized", tags: [] };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // 1) Categorize + tag
    const { category, tags } = await autoCategorizeAndTag(prompt);

    // 2) Generate image (NO invalid params!)
    const enhancedPrompt = buildEnhancedPrompt(prompt);

    const imageResponse = await openai.images.generate({
      model: "gpt-image-1",
      prompt: enhancedPrompt,
      size: "1024x1024",
      n: 1,
      // optional:
      // quality: "high",
    });

    const b64 = imageResponse.data?.[0]?.b64_json;

    if (!b64) {
      return NextResponse.json(
        { error: "No image returned from OpenAI." },
        { status: 500 }
      );
    }

    // 3) Convert base64 → buffer
    const imageBuffer = Buffer.from(b64, "base64");

    // 4) Upload to your EXISTING bucket
    const safeCategory = (category || "Uncategorized").replace(/\s+/g, "-");
    const fileName = `${safeCategory}/image_${Date.now()}.png`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("coloring-pages") // <-- MUST MATCH YOUR BUCKET
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

    // 5) Public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("coloring-pages")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // 6) Save to images table
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
        { error: "Supabase insert failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ image: row }, { status: 200 });
  } catch (err) {
    console.error("Generate route error:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
