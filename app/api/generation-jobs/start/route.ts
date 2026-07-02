import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  generateAndStoreColoringPage,
  getSupabaseAdminClient,
} from "@/app/lib/server/coloringPage";

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(secretKey);
}

function proxiedImageUrl(imageId?: string | null) {
  return imageId ? `/api/images/${imageId}/file` : null;
}

function withProxiedJobImage<T extends { image_id?: string | null; image_url?: string | null }>(
  job: T
) {
  return {
    ...job,
    image_url: proxiedImageUrl(job.image_id) ?? job.image_url,
  };
}

function withProxiedImage<T extends { id: string; image_url?: string | null }>(image: T) {
  return {
    ...image,
    image_url: proxiedImageUrl(image.id) ?? image.image_url,
  };
}

function errorMessage(err: unknown) {
  if (!(err instanceof Error)) {
    return "Unable to process generation job.";
  }

  if (err.message.startsWith("Missing ")) {
    return err.message;
  }

  if (err.message.includes("Invalid URL")) {
    return "Invalid Supabase URL. Check NEXT_PUBLIC_SUPABASE_URL in production.";
  }

  if (err.name?.includes("Stripe") || err.message.includes("No such checkout.session")) {
    return "Stripe could not verify this checkout session. Check that production STRIPE_SECRET_KEY is a live key from the same Stripe account that created the payment.";
  }

  return "Unable to process generation job.";
}

export async function POST(req: NextRequest) {
  let sessionId = "";

  try {
    const body = await req.json();
    sessionId = typeof body?.sessionId === "string" ? body.sessionId.trim() : "";

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

    const prompt = session.metadata?.prompt?.trim();

    if (!prompt) {
      return NextResponse.json(
        { error: "No prompt was attached to this payment." },
        { status: 404 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();

    const { data: existingJob, error: existingError } = await supabaseAdmin
      .from("generation_jobs")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (existingError) {
      console.error("Generation job lookup error:", existingError);
      return NextResponse.json(
        {
          error:
            existingError.code === "42P01"
              ? "Missing generation_jobs table. Run the latest Supabase setup SQL in production."
              : "Unable to load generation job.",
        },
        { status: 500 }
      );
    }

    if (existingJob?.status === "complete" && existingJob.image_url) {
      return NextResponse.json({ job: withProxiedJobImage(existingJob) });
    }

    const { data: job, error: upsertError } = await supabaseAdmin
      .from("generation_jobs")
      .upsert(
        {
          stripe_session_id: sessionId,
          prompt,
          status: "generating",
          error_message: null,
        },
        { onConflict: "stripe_session_id" }
      )
      .select()
      .single();

    if (upsertError) {
      console.error("Generation job upsert error:", upsertError);
      return NextResponse.json(
        {
          error:
            upsertError.code === "42P01"
              ? "Missing generation_jobs table. Run the latest Supabase setup SQL in production."
              : "Unable to start generation job.",
        },
        { status: 500 }
      );
    }

    try {
      const image = await generateAndStoreColoringPage(prompt);

      const { data: completeJob, error: updateError } = await supabaseAdmin
        .from("generation_jobs")
        .update({
          status: "complete",
          image_id: image.id,
          image_url: image.image_url,
          error_message: null,
          completed_at: new Date().toISOString(),
        })
        .eq("id", job.id)
        .select()
        .single();

      if (updateError) {
        console.error("Generation job completion update error:", updateError);
        return NextResponse.json(
          { error: "Image was created, but the job could not be updated." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        job: withProxiedJobImage(completeJob),
        image: withProxiedImage(image),
      });
    } catch (generationError) {
      const message =
        generationError instanceof Error
          ? generationError.message
          : "Image generation failed.";

      await supabaseAdmin
        .from("generation_jobs")
        .update({
          status: "failed",
          error_message: message,
          completed_at: new Date().toISOString(),
        })
        .eq("id", job.id);

      console.error("Paid generation error:", generationError);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch (err) {
    console.error("Generation job error:", err);

    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
