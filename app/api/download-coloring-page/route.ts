// app/api/download-coloring-page/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Supabase Admin Client (can generate signed URLs)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // MUST be service role
  { auth: { persistSession: false } }
);

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    // 1. Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    // 2. Extract original stored file path from metadata
    const imageUrl = session.metadata?.image_url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL in metadata" },
        { status: 500 }
      );
    }

    // 3. Convert full URL → relative path needed by Supabase
    const url = new URL(imageUrl);
    const pathname = url.pathname; 
    // Example: /storage/v1/object/public/coloring-pages/cats/image.png
    // Remove everything before bucket name:
    const filePath = pathname.replace("/storage/v1/object/public/coloring-pages/", "");

    if (!filePath) {
      return NextResponse.json(
        { error: "Could not extract file path" },
        { status: 500 }
      );
    }

    // 4. Generate a signed URL (expires in 60 seconds)
    const { data, error } = await supabaseAdmin
      .storage
      .from("coloring-pages")
      .createSignedUrl(filePath, 60); // 60 seconds

    if (error || !data?.signedUrl) {
      console.error("Signed URL error:", error);
      return NextResponse.json(
        { error: "Unable to generate signed URL" },
        { status: 500 }
      );
    }

    // 5. Redirect user to temporary signed URL
    return NextResponse.redirect(data.signedUrl, 302);

  } catch (err) {
    console.error("Signed download error:", err);
    return NextResponse.json(
      { error: "Unable to deliver download" },
      { status: 500 }
    );
  }
}
