export const metadata = {
  title: "Terms of Service | PaziPagesAI",
  description:
    "Terms for using PaziPagesAI page packs, private studio links, AI-generated coloring pages, payments, and support.",
};

const sections = [
  {
    title: "Using the Service",
    body: "PaziPagesAI provides AI-generated printable coloring pages for creative, educational, and recreational use. By using the site, you agree to these terms.",
  },
  {
    title: "Page Packs and Credits",
    body: "Page packs provide a set number of generation credits. One successful coloring page generation uses one credit. If a technical issue prevents generation, the credit should not be deducted.",
  },
  {
    title: "Payments",
    body: "Payments are processed by Stripe. Purchases are for digital services and are generally final unless required by law or reviewed for a technical failure.",
  },
  {
    title: "Private Studio Links",
    body: "Private studio links act as no-login access to remaining page credits. Keep your link safe. If lost, use the recovery page with the email used at checkout.",
  },
  {
    title: "AI-Generated Output",
    body: "AI output may contain mistakes, artifacts, unexpected details, or unsuitable results. Adults should review pages before providing them to children.",
  },
  {
    title: "User Responsibilities",
    body: "Do not request illegal, harmful, abusive, adult, violent, copyrighted, trademarked, or otherwise inappropriate content. Do not attempt to bypass checkout or misuse the service.",
  },
  {
    title: "Third-Party Services",
    body: "The service relies on providers such as Stripe, Supabase, OpenAI, and Resend. Their own terms and policies may also apply.",
  },
  {
    title: "Availability and Liability",
    body: "The service is provided as is. We do not guarantee uninterrupted availability or perfect output, and liability is limited to the fullest extent allowed by law.",
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <section className="mb-8 rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Legal</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Terms of Service</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-600">
          These terms cover page packs, private studio links, payments, AI-generated
          coloring pages, and acceptable use of PaziPagesAI.
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
        <h2 className="text-2xl font-bold text-gray-950">Questions?</h2>
        <p className="mt-2 text-gray-700">
          Contact{" "}
          <a href="mailto:support@pazipagesai.com" className="font-semibold text-[#2563eb] underline">
            support@pazipagesai.com
          </a>{" "}
          with payment or service questions.
        </p>
      </section>
    </main>
  );
}
