import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    // ----------------------------
    // CLEAN CATEGORY VALUE
    // ----------------------------
    // category = null OR ""  → show ALL
    let category =
      rawCategory && rawCategory !== "null" && rawCategory.trim() !== ""
        ? rawCategory.trim()
        : null;

    // ----------------------------
    // BASE QUERY
    // ----------------------------
    let query = supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // ----------------------------
    // APPLY CATEGORY FILTER ONLY IF VALID
    // ----------------------------
    if (category) {
      // Case-insensitive matching (supports Animals, animals, ANIMALS)
      query = query.ilike("category", category);
    }

    // ----------------------------
    // RUN QUERY
    // ----------------------------
    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    return NextResponse.json({ images: data ?? [] }, { status: 200 });
  } catch (err) {
    console.error("API crash:", err);
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
