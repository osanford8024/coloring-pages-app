export const metadata = {
  title: "Cookie Policy | PaziPagesAI",
  description:
    "How PaziPagesAI uses cookies and similar technologies for checkout, security, recovery links, and performance.",
};

const sections = [
  {
    title: "What Cookies Do",
    body: "Cookies are small files stored by your browser. They help websites load correctly, support secure checkout, remember basic state, and understand site performance.",
  },
  {
    title: "How We Use Them",
    body: "PaziPagesAI may use cookies or similar technologies for essential site functions, Stripe checkout, fraud prevention, analytics, and reliable page loading.",
  },
  {
    title: "Third-Party Providers",
    body: "Stripe, Supabase, OpenAI, Resend, and other service providers may use cookies or similar technologies according to their own policies.",
  },
  {
    title: "Managing Cookies",
    body: "You can limit or disable cookies in your browser settings. Some features, including checkout or recovery flows, may not work correctly if required cookies are blocked.",
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <section className="mb-8 rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Policy</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Cookie Policy</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-600">
          This page explains how cookies and similar technologies support the
          PaziPagesAI website, checkout, and no-login page pack experience.
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
        <h2 className="text-2xl font-bold text-gray-950">Contact</h2>
        <p className="mt-2 text-gray-700">
          Questions about cookies can be sent to{" "}
          <a href="mailto:support@pazipagesai.com" className="font-semibold text-[#2563eb] underline">
            support@pazipagesai.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
