import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/app/lib/server/coloringPage";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token")?.trim() ?? "";

    if (!token) {
      return NextResponse.json({ error: "Missing page pack link." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { data: creditSession, error } = await supabaseAdmin
      .from("credit_sessions")
      .select("id, access_token, credits_purchased, credits_remaining, status, created_at")
      .eq("access_token", token)
      .maybeSingle();

    if (error) {
      console.error("Credit session load error:", error);
      return NextResponse.json(
        {
          error:
            error.code === "42P01"
              ? "Missing credit_sessions table. Run the latest Supabase setup SQL in dev."
              : "Unable to load page pack.",
        },
        { status: 500 }
      );
    }

    if (!creditSession) {
      return NextResponse.json({ error: "Page pack link was not found." }, { status: 404 });
    }

    return NextResponse.json({ creditSession });
  } catch (err) {
    console.error("Credit session error:", err);
    return NextResponse.json({ error: "Unable to load page pack." }, { status: 500 });
  }
}
