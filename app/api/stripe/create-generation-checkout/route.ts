import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const DEFAULT_PRICE_CENTS = 89;
const MAX_PROMPT_LENGTH = 500;

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(secretKey);
}

function getBaseUrl(req: NextRequest) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  return req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, price } = await req.json();
    const cleanPrompt = typeof prompt === "string" ? prompt.trim() : "";

    if (!cleanPrompt) {
      return NextResponse.json({ error: "Missing prompt." }, { status: 400 });
    }

    if (cleanPrompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: `Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer.` },
        { status: 400 }
      );
    }

    const unitAmount = Math.max(Number(price) || DEFAULT_PRICE_CENTS, 50);
    const stripe = getStripeClient();
    const baseUrl = getBaseUrl(req);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Custom printable coloring page",
              description: "One AI-generated printable coloring page.",
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        prompt: cleanPrompt,
      },
      success_url: `${baseUrl}/generate/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/generate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Generation checkout error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.startsWith("Missing ")
            ? err.message
            : "Unable to start checkout.",
      },
      { status: 500 }
    );
  }
}
