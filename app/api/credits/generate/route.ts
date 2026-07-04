import { NextRequest, NextResponse } from "next/server";
import {
  generateAndStoreColoringPage,
  getSupabaseAdminClient,
} from "@/app/lib/server/coloringPage";

const MAX_PROMPT_LENGTH = 500;

type CreditSession = {
  id: string;
  credits_remaining: number;
  status: "active" | "depleted" | "refunded";
};

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

export async function POST(req: NextRequest) {
  let jobId = "";

  try {
    const body = await req.json();
    const token = typeof body?.token === "string" ? body.token.trim() : "";
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!token) {
      return NextResponse.json({ error: "Missing page pack link." }, { status: 400 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "Enter a prompt before generating." }, { status: 400 });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: `Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer.` },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const { data: creditSession, error: sessionError } = await supabaseAdmin
      .from("credit_sessions")
      .select("id, credits_remaining, status")
      .eq("access_token", token)
      .maybeSingle<CreditSession>();

    if (sessionError) {
      console.error("Credit session lookup error:", sessionError);
      return NextResponse.json(
        {
          error:
            sessionError.code === "42P01"
              ? "Missing credit_sessions table. Run the latest Supabase setup SQL in dev."
              : "Unable to load page pack.",
        },
        { status: 500 }
      );
    }

    if (!creditSession) {
      return NextResponse.json({ error: "Page pack link was not found." }, { status: 404 });
    }

    if (creditSession.status !== "active" || creditSession.credits_remaining <= 0) {
      return NextResponse.json({ error: "This page pack has no pages left." }, { status: 402 });
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("generation_jobs")
      .insert({
        credit_session_id: creditSession.id,
        prompt,
        status: "generating",
        error_message: null,
      })
      .select()
      .single();

    if (jobError) {
      console.error("Credit generation job insert error:", jobError);
      return NextResponse.json(
        {
          error:
            jobError.code === "42P01"
              ? "Missing generation_jobs table. Run the latest Supabase setup SQL in dev."
              : "Unable to start generation job.",
        },
        { status: 500 }
      );
    }

    jobId = job.id;

    try {
      const image = await generateAndStoreColoringPage(prompt);
      const nextCredits = Math.max(creditSession.credits_remaining - 1, 0);
      const nextStatus = nextCredits === 0 ? "depleted" : "active";

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
        console.error("Credit generation job completion update error:", updateError);
        return NextResponse.json(
          { error: "Image was created, but the job could not be updated." },
          { status: 500 }
        );
      }

      const { data: updatedCreditSession, error: creditUpdateError } = await supabaseAdmin
        .from("credit_sessions")
        .update({
          credits_remaining: nextCredits,
          status: nextStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", creditSession.id)
        .select("id, access_token, credits_purchased, credits_remaining, status, created_at")
        .single();

      if (creditUpdateError) {
        console.error("Credit decrement error:", creditUpdateError);
        return NextResponse.json(
          { error: "Image was created, but the page pack balance could not be updated." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        job: withProxiedJobImage(completeJob),
        image: withProxiedImage(image),
        creditSession: updatedCreditSession,
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

      console.error("Credit generation error:", generationError);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch (err) {
    console.error("Credit generation route error:", { err, jobId });
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.startsWith("Missing ")
            ? err.message
            : "Unable to create your coloring page.",
      },
      { status: 500 }
    );
  }
}
