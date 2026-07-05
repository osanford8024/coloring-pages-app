import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/app/lib/server/coloringPage";
import { createAccessToken, getBaseUrl } from "../../credits/shared";
import { sendStudioLinkEmail } from "../../credits/email";

type PromoCampaign = {
  id: string;
  code: string;
  label: string;
  credits_per_redemption: number;
  max_redemptions: number | null;
  active: boolean;
  starts_at: string | null;
  expires_at: string | null;
};

type PromoRedemption = {
  id: string;
  credit_session_id: string;
  credit_sessions: {
    access_token: string;
    credits_purchased: number;
    credits_remaining: number;
  } | null;
};

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizeCode(value: unknown) {
  return typeof value === "string" ? value.trim().toUpperCase() : "";
}

function campaignUnavailableReason(campaign: PromoCampaign) {
  const now = Date.now();

  if (!campaign.active) {
    return "This promo code is not active.";
  }

  if (campaign.starts_at && Date.parse(campaign.starts_at) > now) {
    return "This promo code is not active yet.";
  }

  if (campaign.expires_at && Date.parse(campaign.expires_at) <= now) {
    return "This promo code has expired.";
  }

  return null;
}

function studioUrlFor(req: NextRequest, accessToken: string) {
  return `${getBaseUrl(req)}/generate?token=${accessToken}`;
}

async function sendPromoStudioEmail(input: {
  req: NextRequest;
  email: string;
  accessToken: string;
  creditsPurchased: number;
  creditsRemaining: number;
}) {
  const studioUrl = studioUrlFor(input.req, input.accessToken);

  await sendStudioLinkEmail({
    to: input.email,
    studioUrl,
    creditsPurchased: input.creditsPurchased,
    creditsRemaining: input.creditsRemaining,
  });

  return studioUrl;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = normalizeCode(body?.code);
    const email = normalizeEmail(body?.email);

    if (!code) {
      return NextResponse.json({ error: "Enter a promo code." }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { data: campaign, error: campaignError } = await supabaseAdmin
      .from("promo_campaigns")
      .select("*")
      .eq("code", code)
      .maybeSingle<PromoCampaign>();

    if (campaignError) {
      console.error("Promo campaign lookup error:", campaignError);
      return NextResponse.json(
        {
          error:
            campaignError.code === "42P01"
              ? "Missing promo campaign tables. Run the latest Supabase setup SQL."
              : "Unable to load promo code.",
        },
        { status: 500 }
      );
    }

    if (!campaign) {
      return NextResponse.json({ error: "Promo code was not found." }, { status: 404 });
    }

    const unavailableReason = campaignUnavailableReason(campaign);
    if (unavailableReason) {
      return NextResponse.json({ error: unavailableReason }, { status: 403 });
    }

    const { data: existingRedemption, error: existingError } = await supabaseAdmin
      .from("promo_redemptions")
      .select(
        "id, credit_session_id, credit_sessions(access_token, credits_purchased, credits_remaining)"
      )
      .eq("campaign_id", campaign.id)
      .eq("email", email)
      .maybeSingle<PromoRedemption>();

    if (existingError) {
      console.error("Promo redemption lookup error:", existingError);
      return NextResponse.json({ error: "Unable to check promo redemption." }, { status: 500 });
    }

    if (existingRedemption?.credit_sessions) {
      const creditSession = existingRedemption.credit_sessions;
      const studioUrl = await sendPromoStudioEmail({
        req,
        email,
        accessToken: creditSession.access_token,
        creditsPurchased: creditSession.credits_purchased,
        creditsRemaining: creditSession.credits_remaining,
      });

      return NextResponse.json({
        ok: true,
        alreadyRedeemed: true,
        studioUrl,
        creditSession,
        campaign: { code: campaign.code, label: campaign.label },
      });
    }

    if (campaign.max_redemptions) {
      const { count, error: countError } = await supabaseAdmin
        .from("promo_redemptions")
        .select("id", { count: "exact", head: true })
        .eq("campaign_id", campaign.id);

      if (countError) {
        console.error("Promo redemption count error:", countError);
        return NextResponse.json({ error: "Unable to check promo availability." }, { status: 500 });
      }

      if ((count ?? 0) >= campaign.max_redemptions) {
        return NextResponse.json({ error: "This promo code has reached its limit." }, { status: 409 });
      }
    }

    const credits = campaign.credits_per_redemption;
    const { data: creditSession, error: creditSessionError } = await supabaseAdmin
      .from("credit_sessions")
      .insert({
        access_token: createAccessToken(),
        customer_email: email,
        credits_purchased: credits,
        credits_remaining: credits,
        status: "active",
      })
      .select("id, access_token, credits_purchased, credits_remaining")
      .single();

    if (creditSessionError) {
      console.error("Promo credit session insert error:", creditSessionError);
      return NextResponse.json(
        {
          error:
            creditSessionError.code === "23502"
              ? "Credit sessions require the latest Supabase setup SQL before promo codes can be redeemed."
              : "Unable to create promo studio link.",
        },
        { status: 500 }
      );
    }

    const { error: redemptionError } = await supabaseAdmin
      .from("promo_redemptions")
      .insert({
        campaign_id: campaign.id,
        email,
        credit_session_id: creditSession.id,
      });

    if (redemptionError) {
      console.error("Promo redemption insert error:", redemptionError);
      return NextResponse.json(
        {
          error:
            redemptionError.code === "23505"
              ? "This email has already redeemed this promo code. Use recovery to resend the studio link."
              : "Unable to redeem promo code.",
        },
        { status: redemptionError.code === "23505" ? 409 : 500 }
      );
    }

    const studioUrl = await sendPromoStudioEmail({
      req,
      email,
      accessToken: creditSession.access_token,
      creditsPurchased: creditSession.credits_purchased,
      creditsRemaining: creditSession.credits_remaining,
    });

    return NextResponse.json({
      ok: true,
      alreadyRedeemed: false,
      studioUrl,
      creditSession,
      campaign: { code: campaign.code, label: campaign.label },
    });
  } catch (err) {
    console.error("Promo redeem error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.startsWith("Missing ")
            ? err.message
            : "Unable to redeem promo code.",
      },
      { status: 500 }
    );
  }
}
