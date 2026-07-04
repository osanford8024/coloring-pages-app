import { NextRequest, NextResponse } from "next/server";

const MAX_MESSAGE_LENGTH = 2000;

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.CONTACT_TO_EMAIL || process.env.SUPPORT_EMAIL || "support@pazipagesai.com";

  if (!apiKey || !from) {
    throw new Error("Missing RESEND_API_KEY or EMAIL_FROM");
  }

  return { apiKey, from, to };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function cleanField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function sendResendEmail(config: ReturnType<typeof getEmailConfig>, payload: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: payload.to,
      reply_to: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend contact email failed: ${res.status} ${errorText}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = cleanField(body?.name);
    const email = cleanField(body?.email).toLowerCase();
    const topic = cleanField(body?.topic) || "General question";
    const message = cleanField(body?.message);

    if (!name) {
      return NextResponse.json({ error: "Enter your name." }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: "Enter a message." }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
        { status: 400 }
      );
    }

    const config = getEmailConfig();
    const supportSubject = `PaziPagesAI contact: ${topic}`;
    const confirmationSubject = "We received your PaziPagesAI message";
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeTopic = escapeHtml(topic);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await sendResendEmail(config, {
      to: config.to,
      replyTo: email,
      subject: supportSubject,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #172033; line-height: 1.6; max-width: 640px;">
          <h1 style="font-size: 22px; margin-bottom: 16px;">New PaziPagesAI contact message</h1>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Topic:</strong> ${safeTopic}</p>
          <div style="margin-top: 18px; padding: 14px; border: 1px solid #d9e2f1; border-radius: 8px;">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    await sendResendEmail(config, {
      to: email,
      subject: confirmationSubject,
      text: `Hi ${name},\n\nWe received your PaziPagesAI message about ${topic}. We will reply as soon as we can.\n\nYour message:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #172033; line-height: 1.6; max-width: 640px;">
          <h1 style="font-size: 22px; margin-bottom: 16px;">We received your message</h1>
          <p>Hi ${safeName},</p>
          <p>Thanks for contacting PaziPagesAI. We received your message about <strong>${safeTopic}</strong> and will reply as soon as we can.</p>
          <div style="margin-top: 18px; padding: 14px; border: 1px solid #d9e2f1; border-radius: 8px;">
            ${safeMessage}
          </div>
          <p style="font-size: 14px; color: #5b6475;">If this is about a page pack, keep your Stripe receipt or studio link handy.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.startsWith("Missing ")
            ? err.message
            : "Unable to send your message right now.",
      },
      { status: 500 }
    );
  }
}
