import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(secretKey);
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing payment session." },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment has not been completed." },
        { status: 402 }
      );
    }

    const imageUrl = session.metadata?.imageUrl;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No download was attached to this payment." },
        { status: 404 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error("Download lookup error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.startsWith("Missing ")
            ? err.message
            : "Unable to fetch your download.",
      },
      { status: 500 }
    );
  }
}
