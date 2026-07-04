import { NextRequest, NextResponse } from "next/server";
import { CREDIT_PACKS, CreditPackId, getBaseUrl, getStripeClient } from "../../credits/shared";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const packId = typeof body?.packId === "string" ? body.packId : "popular";
    const pack = CREDIT_PACKS[packId as CreditPackId] ?? CREDIT_PACKS.popular;
    const stripe = getStripeClient();
    const baseUrl = getBaseUrl(req);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email:
        typeof body?.email === "string" && body.email.includes("@")
          ? body.email.trim()
          : undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${pack.credits} custom coloring pages`,
              description: "Prepaid credits for AI-generated printable coloring pages.",
            },
            unit_amount: pack.unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        checkout_type: "credit_pack",
        pack_id: pack.id,
        credits: String(pack.credits),
      },
      success_url: `${baseUrl}/generate/credits?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/generate`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Credit checkout error:", err);
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
