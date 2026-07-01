import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ImageRow = {
  id: string;
  prompt: string;
  image_url: string;
  category?: string | null;
  tags?: string[] | null;
  created_at?: string;
};

function withProxiedImageUrl(image: ImageRow) {
  return {
    ...image,
    image_url: `/api/images/${image.id}/file`,
  };
}

export async function GET(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit") ?? 12);
    const offset = Number(searchParams.get("offset") ?? 0);
    const rawCategory = searchParams.get("category");

    const category =
      rawCategory && rawCategory !== "null" && rawCategory.trim() !== ""
        ? rawCategory.trim()
        : null;

    let query = supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.ilike("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    return NextResponse.json(
      { images: (data ?? []).map((image) => withProxiedImageUrl(image)) },
      { status: 200 }
    );
  } catch (err) {
    console.error("API crash:", err);
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}