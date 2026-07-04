type StudioLink = {
  studioUrl: string;
  creditsRemaining: number;
  creditsPurchased: number;
  createdAt?: string | null;
};

type SendStudioLinkEmailInput = {
  to: string;
  studioUrl: string;
  creditsRemaining: number;
  creditsPurchased: number;
};

type SendRecoveryEmailInput = {
  to: string;
  links: StudioLink[];
};

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return null;
  }

  return { apiKey, from };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(payload: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const config = getEmailConfig();

  if (!config) {
    console.warn("Skipping email because RESEND_API_KEY or EMAIL_FROM is missing.");
    return { sent: false, reason: "missing_config" } as const;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Resend email failed: ${res.status} ${errorText}`);
  }

  return { sent: true } as const;
}

export async function sendStudioLinkEmail({
  to,
  studioUrl,
  creditsRemaining,
  creditsPurchased,
}: SendStudioLinkEmailInput) {
  const safeStudioUrl = escapeHtml(studioUrl);
  const pageText = creditsRemaining === 1 ? "page" : "pages";

  return sendEmail({
    to,
    subject: "Your PaziPagesAI page pack is ready",
    text: `Your PaziPagesAI page pack is ready. You have ${creditsRemaining} of ${creditsPurchased} coloring pages available. Open your private studio: ${studioUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #172033; line-height: 1.6; max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 24px; margin-bottom: 12px;">Your page pack is ready</h1>
        <p>You have <strong>${creditsRemaining} of ${creditsPurchased}</strong> coloring ${pageText} available.</p>
        <p>Use your private studio link to create coloring pages without logging in:</p>
        <p style="margin: 24px 0;">
          <a href="${safeStudioUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 18px; border-radius: 8px; text-decoration: none; display: inline-block;">Open Private Studio</a>
        </p>
        <p style="font-size: 14px; color: #5b6475; word-break: break-all;">${safeStudioUrl}</p>
        <p style="font-size: 14px; color: #5b6475;">Keep this email so you can return to your remaining pages later.</p>
      </div>
    `,
  });
}

export async function sendRecoveryEmail({ to, links }: SendRecoveryEmailInput) {
  const activeLinks = links.filter((link) => link.creditsRemaining > 0);
  const linkText = activeLinks
    .map(
      (link, index) =>
        `${index + 1}. ${link.creditsRemaining} of ${link.creditsPurchased} pages left: ${link.studioUrl}`
    )
    .join("\n");
  const linkHtml = activeLinks
    .map((link) => {
      const safeStudioUrl = escapeHtml(link.studioUrl);
      return `
        <div style="border: 1px solid #d9e2f1; border-radius: 8px; padding: 14px; margin: 12px 0;">
          <p style="margin: 0 0 10px;"><strong>${link.creditsRemaining} of ${link.creditsPurchased}</strong> pages left</p>
          <a href="${safeStudioUrl}" style="background: #2563eb; color: #ffffff; padding: 10px 14px; border-radius: 8px; text-decoration: none; display: inline-block;">Open Private Studio</a>
          <p style="font-size: 13px; color: #5b6475; word-break: break-all; margin-bottom: 0;">${safeStudioUrl}</p>
        </div>
      `;
    })
    .join("");

  return sendEmail({
    to,
    subject: "Your PaziPagesAI studio links",
    text: activeLinks.length
      ? `We found these active PaziPagesAI page packs for this email:\n\n${linkText}`
      : "We did not find any active PaziPagesAI page packs for this email.",
    html: `
      <div style="font-family: Arial, sans-serif; color: #172033; line-height: 1.6; max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 24px; margin-bottom: 12px;">Your studio links</h1>
        ${
          activeLinks.length
            ? `<p>We found these active page packs for this email:</p>${linkHtml}`
            : "<p>We did not find any active page packs for this email.</p>"
        }
        <p style="font-size: 14px; color: #5b6475;">If you did not request this email, you can ignore it.</p>
      </div>
    `,
  });
}
