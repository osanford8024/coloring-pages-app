import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/app/lib/server/coloringPage";
import {
  createAccessToken,
  CREDIT_PACKS,
  CreditPackId,
  getBaseUrl,
  getStripeClient,
} from "../shared";
import { sendStudioLinkEmail } from "../email";

function resolveCredits(sessionCredits?: string | null, packId?: string | null) {
  const parsedCredits = Number(sessionCredits);

  if (Number.isFinite(parsedCredits) && parsedCredits > 0) {
    return Math.floor(parsedCredits);
  }

  const pack = packId ? CREDIT_PACKS[packId as CreditPackId] : null;
  return pack?.credits ?? CREDIT_PACKS.popular.credits;
}

type CreditSession = {
  id: string;
  access_token: string;
  customer_email: string | null;
  credits_purchased: number;
  credits_remaining: number;
  link_email_sent_at: string | null;
};

async function sendStudioLinkIfNeeded(
  req: NextRequest,
  creditSession: CreditSession,
  supabaseAdmin: ReturnType<typeof getSupabaseAdminClient>
) {
  if (!creditSession.customer_email || creditSession.link_email_sent_at) {
    return creditSession;
  }

  const studioUrl = `${getBaseUrl(req)}/generate?token=${creditSession.access_token}`;

  try {
    const result = await sendStudioLinkEmail({
      to: creditSession.customer_email,
      studioUrl,
      creditsRemaining: creditSession.credits_remaining,
      creditsPurchased: creditSession.credits_purchased,
    });

    if (!result.sent) {
      return creditSession;
    }

    const sentAt = new Date().toISOString();
    const { data: updatedSession, error: updateError } = await supabaseAdmin
      .from("credit_sessions")
      .update({ link_email_sent_at: sentAt, updated_at: sentAt })
      .eq("id", creditSession.id)
      .select()
      .single();

    if (updateError) {
      console.error("Credit session email timestamp update error:", updateError);
      return creditSession;
    }

    return updatedSession as CreditSession;
  } catch (emailError) {
    console.error("Studio link email error:", emailError);
    return creditSession;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId.trim() : "";

    if (!sessionId) {
      return NextResponse.json({ error: "Missing payment session." }, { status: 400 });
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment has not been completed." }, { status: 402 });
    }

    if (session.metadata?.checkout_type !== "credit_pack") {
      return NextResponse.json({ error: "This checkout session is not a page pack." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { data: existingSession, error: existingError } = await supabaseAdmin
      .from("credit_sessions")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (existingError) {
      console.error("Credit session lookup error:", existingError);
      return NextResponse.json(
        {
          error:
            existingError.code === "42P01"
              ? "Missing credit_sessions table. Run the latest Supabase setup SQL in dev."
              : "Unable to load credit session.",
        },
        { status: 500 }
      );
    }

    if (existingSession) {
      const emailedSession = await sendStudioLinkIfNeeded(
        req,
        existingSession as CreditSession,
        supabaseAdmin
      );
      return NextResponse.json({ creditSession: emailedSession });
    }

    const credits = resolveCredits(session.metadata?.credits, session.metadata?.pack_id);
    const customerEmail = session.customer_details?.email ?? session.customer_email ?? null;

    const { data: creditSession, error: insertError } = await supabaseAdmin
      .from("credit_sessions")
      .insert({
        access_token: createAccessToken(),
        stripe_session_id: sessionId,
        customer_email: customerEmail,
        credits_purchased: credits,
        credits_remaining: credits,
        status: "active",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Credit session insert error:", insertError);
      return NextResponse.json({ error: "Unable to create credit session." }, { status: 500 });
    }

    const emailedSession = await sendStudioLinkIfNeeded(
      req,
      creditSession as CreditSession,
      supabaseAdmin
    );

    return NextResponse.json({ creditSession: emailedSession });
  } catch (err) {
    console.error("Credit claim error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.startsWith("Missing ")
            ? err.message
            : "Unable to confirm page pack.",
      },
      { status: 500 }
    );
  }
}
