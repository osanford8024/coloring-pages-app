import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/app/lib/server/coloringPage";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Missing image id." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { data, error } = await supabaseAdmin
      .from("images")
      .select("image_url")
      .eq("id", id)
      .single();

    if (error || !data?.image_url) {
      console.error("Image proxy lookup error:", error);
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    const imageResponse = await fetch(data.image_url);

    if (!imageResponse.ok || !imageResponse.body) {
      return NextResponse.json(
        { error: "Unable to load image." },
        { status: 502 }
      );
    }

    return new NextResponse(imageResponse.body, {
      status: 200,
      headers: {
        "Content-Type": imageResponse.headers.get("content-type") || "image/png",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (err) {
    console.error("Image proxy error:", err);
    return NextResponse.json(
      { error: "Unable to load image." },
      { status: 500 }
    );
  }
}