import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/app/lib/server/coloringPage";
import { getBaseUrl } from "../shared";
import { sendRecoveryEmail } from "../email";

const MAX_RECOVERY_LINKS = 5;

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = normalizeEmail(body?.email);

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Enter the email used at checkout." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { data: creditSessions, error } = await supabaseAdmin
      .from("credit_sessions")
      .select("access_token, credits_purchased, credits_remaining, status, created_at")
      .eq("customer_email", email)
      .eq("status", "active")
      .gt("credits_remaining", 0)
      .order("created_at", { ascending: false })
      .limit(MAX_RECOVERY_LINKS);

    if (error) {
      console.error("Credit recovery lookup error:", error);
      return NextResponse.json(
        {
          error:
            error.code === "42P01"
              ? "Missing credit_sessions table. Run the latest Supabase setup SQL in dev."
              : "Unable to look up page packs.",
        },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl(req);
    const links = (creditSessions ?? []).map((creditSession) => ({
      studioUrl: `${baseUrl}/generate?token=${creditSession.access_token}`,
      creditsRemaining: creditSession.credits_remaining,
      creditsPurchased: creditSession.credits_purchased,
      createdAt: creditSession.created_at,
    }));

    await sendRecoveryEmail({ to: email, links });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Credit recovery error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.startsWith("Missing ")
            ? err.message
            : "Unable to send recovery email.",
      },
      { status: 500 }
    );
  }
}
