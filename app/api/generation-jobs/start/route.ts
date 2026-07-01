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

function jsonError(err: unknown, fallback: string) {
  return err instanceof Error && err.message.startsWith("Missing ")
    ? err.message
    : fallback;
}

export async function POST(req: NextRequest) {
  let sessionId = "";

  try {
    const supabaseAdmin = getSupabaseAdminClient();
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

    const { data: existingJob, error: existingError } = await supabaseAdmin
      .from("generation_jobs")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (existingError) {
      console.error("Generation job lookup error:", existingError);
      return NextResponse.json(
        { error: "Unable to load generation job." },
        { status: 500 }
      );
    }

    if (existingJob?.status === "complete" && existingJob.image_url) {
      return NextResponse.json({ job: existingJob });
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
        { error: "Unable to start generation job." },
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

      return NextResponse.json({ job: completeJob, image });
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

    return NextResponse.json(
      { error: jsonError(err, "Unable to process generation job.") },
      { status: 500 }
    );
  }
}

