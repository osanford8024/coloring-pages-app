import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl, price } = body as {
      imageUrl?: string;
      price?: number; // in cents
    };

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Missing imageUrl" },
        { status: 400 }
      );
    }

    // ---- VALIDATE IMAGE URL ----
    let finalUrl = imageUrl;
    if (imageUrl.startsWith("/")) {
      finalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${imageUrl}`;
    }

    try {
      new URL(finalUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid image URL" },
        { status: 400 }
      );
    }

    // ---- PRICE HANDLING ----
    // Default is 89 cents unless passed from component
    const PRICE_IN_CENTS = price && price >= 50 ? price : 89;

    if (PRICE_IN_CENTS < 50) {
      return NextResponse.json(
        { error: "Stripe minimum price is 50 cents." },
        { status: 400 }
      );
    }

    // ---- CREATE STRIPE CHECKOUT SESSION ----
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Coloring Page Download",
              description: "High-resolution printable coloring page",
              images: [finalUrl], // shows preview in Stripe
            },
            unit_amount: PRICE_IN_CENTS,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/download-coloring-page?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/generate?canceled=1`,

      metadata: {
        image_url: finalUrl,
        price_cents: PRICE_IN_CENTS.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe pay-per-download error:", err);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
