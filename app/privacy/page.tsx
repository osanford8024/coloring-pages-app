export const metadata = {
  title: "Privacy Policy | PaziPagesAI",
  description:
    "How PaziPagesAI handles prompts, page pack purchases, private studio links, support emails, and generated coloring page data.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect prompts you submit, support messages you send, checkout email details provided through Stripe, and technical data needed to run the service. We do not store your full card number.",
  },
  {
    title: "Page Packs and Private Links",
    body: "When you buy a page pack, we store a Stripe checkout session identifier, your checkout email, credit balance, and private studio token so you can return without creating an account.",
  },
  {
    title: "Generated Images",
    body: "Generated images and related metadata may be stored in Supabase for delivery, gallery display, support, moderation, and abuse prevention.",
  },
  {
    title: "Service Providers",
    body: "We use providers such as Stripe, Supabase, OpenAI, and Resend to process payments, store generated images, create AI output, and send transactional emails.",
  },
  {
    title: "Cookies and Security",
    body: "Cookies and similar technologies may support checkout, site functionality, fraud prevention, analytics, and service reliability. Browser settings can limit cookies, but some features may not work correctly.",
  },
  {
    title: "Your Choices",
    body: "You may contact us to request access, correction, or deletion of data we store, subject to legal, security, and operational requirements.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <section className="mb-8 rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Policy</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Privacy Policy</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-600">
          This policy explains how PaziPagesAI handles information connected to
          page packs, private studio links, support requests, and generated coloring pages.
        </p>
        <p className="mt-4 text-sm text-gray-500">Last updated: July 2026</p>
      </section>

      <div className="space-y-4">
        {sections.map((section) => (
          <section key={section.title} className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-gray-600">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-2xl font-bold text-gray-950">Contact Us</h2>
        <p className="mt-2 text-gray-700">
          Questions about privacy or data requests can be sent through the{" "}
          <a href="/contact" className="font-semibold text-[#2563eb] underline">
            contact form
          </a>
          .
        </p>
      </section>
    </main>
  );
}
