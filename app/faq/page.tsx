import Link from "next/link";
import type { ReactNode } from "react";

type FAQ = {
  question: string;
  answer: string;
  content: ReactNode;
};

const linkClass = "font-semibold text-[#2563eb] underline";

const faqs: FAQ[] = [
  {
    question: "Do I need an account to use PaziPagesAI?",
    answer:
      "No. PaziPagesAI uses private studio links instead of usernames and passwords. After checkout, your page pack is connected to a private link that lets you create coloring pages without logging in.",
    content: (
      <>
        No. PaziPagesAI uses private studio links instead of usernames and
        passwords. After checkout, your page pack is connected to a private link
        that lets you create coloring pages without logging in. You can start on
        the <Link href="/generate" className={linkClass}>Generate page</Link>.
      </>
    ),
  },
  {
    question: "How do page packs work?",
    answer:
      "A page pack gives you a set number of custom coloring pages. For example, a 12 page pack lets you generate 12 printable coloring pages. Each successful generation uses 1 page from your pack.",
    content: (
      <>
        A page pack gives you a set number of custom coloring pages. For example,
        a 12 page pack lets you generate 12 printable coloring pages. Each
        successful generation uses 1 page from your pack. View the current packs
        on the <Link href="/generate" className={linkClass}>Generate page</Link>.
      </>
    ),
  },
  {
    question: "What happens if image generation fails?",
    answer:
      "If a technical issue prevents the image from being created, your page credit should not be deducted. You can try again or contact support if the problem continues.",
    content: (
      <>
        If a technical issue prevents the image from being created, your page
        credit should not be deducted. You can try again or{" "}
        <Link href="/contact" className={linkClass}>contact support</Link> if the
        problem continues.
      </>
    ),
  },
  {
    question: "I lost my private studio link. How do I get it back?",
    answer:
      "Use the studio link recovery page and enter the same email address used at Stripe checkout. If that email has active page packs, PaziPagesAI will send the private studio link back to that inbox.",
    content: (
      <>
        Use the <Link href="/generate/recover" className={linkClass}>studio link recovery page</Link>{" "}
        and enter the same email address used at Stripe checkout. If that email
        has active page packs, PaziPagesAI will send the private studio link back
        to that inbox.
      </>
    ),
  },
  {
    question: "Can I use my page pack on another device?",
    answer:
      "Yes. Open your private studio link from the email or recovery message on the device you want to use. Since there is no login, the private link is what gives access to the remaining pages.",
    content: (
      <>
        Yes. Open your private studio link from the email or recovery message on
        the device you want to use. Since there is no login, the private link is
        what gives access to the remaining pages. If needed, use{" "}
        <Link href="/generate/recover" className={linkClass}>Recover Studio Link</Link>.
      </>
    ),
  },
  {
    question: "Why is my old studio link not loading?",
    answer:
      "Your private studio link is tied to an active page pack. If the pack is depleted, refunded, removed, or no longer active, the link may stop loading your studio. Use the recovery page to resend any active links tied to your checkout email, or contact support if you believe pages are missing.",
    content: (
      <>
        Your private studio link is tied to an active page pack. If the pack is
        depleted, refunded, removed, or no longer active, the link may stop
        loading your studio. Use the{" "}
        <Link href="/generate/recover" className={linkClass}>recovery page</Link>{" "}
        to resend active links tied to your checkout email, or{" "}
        <Link href="/contact" className={linkClass}>contact support</Link> if you
        believe pages are missing.
      </>
    ),
  },
  {
    question: "Can I print the coloring pages?",
    answer:
      "Yes. Generated pages are designed as black-and-white printable coloring pages. You can download the PNG file or use the print option to print at home or save as a PDF.",
    content: (
      <>
        Yes. Generated pages are designed as black-and-white printable coloring
        pages. You can download the PNG file or use the print option to print at
        home or save as a PDF. You can also browse examples in the{" "}
        <Link href="/gallery" className={linkClass}>Gallery</Link>.
      </>
    ),
  },
  {
    question: "Are the coloring pages kid-friendly?",
    answer:
      "PaziPagesAI is designed for family-friendly coloring page prompts. The service uses prompt guidance and provider safety systems, but AI can still make mistakes, so adults should review pages before giving them to children.",
    content: (
      <>
        PaziPagesAI is designed for family-friendly coloring page prompts. The
        service uses prompt guidance and provider safety systems, but AI can
        still make mistakes, so adults should review pages before giving them to
        children. Read more in the{" "}
        <Link href="/disclaimer" className={linkClass}>Content Disclaimer</Link>.
      </>
    ),
  },
  {
    question: "Where are payments processed?",
    answer:
      "Payments are processed securely through Stripe. PaziPagesAI does not store your full card details.",
    content: (
      <>
        Payments are processed securely through Stripe. PaziPagesAI does not
        store your full card details. See the{" "}
        <Link href="/privacy" className={linkClass}>Privacy Policy</Link> and{" "}
        <Link href="/terms" className={linkClass}>Terms of Service</Link> for more details.
      </>
    ),
  },
  {
    question: "Can I get help with a payment or missing page pack?",
    answer:
      "Yes. Contact support with the email used at checkout and any Stripe receipt or session reference you have so the purchase can be reviewed.",
    content: (
      <>
        Yes. <Link href="/contact" className={linkClass}>Contact support</Link>{" "}
        with the email used at checkout and any Stripe receipt or session
        reference you have so the purchase can be reviewed.
      </>
    ),
  },
];

export const metadata = {
  title: "FAQ | PaziPagesAI",
  description:
    "Frequently asked questions about PaziPagesAI page packs, private studio links, recovering your link, printing coloring pages, and secure Stripe checkout.",
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-700 leading-relaxed">
          Answers about buying page packs, using your private studio link,
          recovering access, and printing custom AI coloring pages.
        </p>
      </div>

      <section className="space-y-8">
        {faqs.map((faq) => (
          <article key={faq.question} className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl font-semibold mb-3">{faq.question}</h2>
            <p className="text-gray-700 leading-relaxed">{faq.content}</p>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-2xl font-semibold mb-3">Need Your Studio Link?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you already bought a page pack but cannot find the email, recover
          your private studio link using the same email address from checkout.
        </p>
        <Link
          href="/generate/recover"
          className="inline-block px-5 py-3 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-[#1e4fc2] transition"
        >
          Recover Studio Link
        </Link>
      </section>

      <section className="mt-10 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-3">Still Have Questions?</h2>
        <p>
          Email support at{" "}
          <a href="mailto:support@pazipagesai.com" className="text-[#2563eb] underline">
            support@pazipagesai.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
