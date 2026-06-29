import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

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
    const { imageUrl, price } = await req.json();

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json({ error: "Missing image URL." }, { status: 400 });
    }

    const unitAmount = Math.max(Number(price) || 89, 50);
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
              name: "Printable coloring page",
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        imageUrl,
      },
      success_url: `${baseUrl}/download-complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/generate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
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
