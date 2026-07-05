export const metadata = {
  title: "Content Disclaimer | PaziPagesAI",
  description:
    "Important information about AI-generated coloring pages, page packs, safety, copyrighted content, and service availability.",
};

const sections = [
  {
    title: "AI-Generated Coloring Pages",
    body: "PaziPagesAI uses artificial intelligence to create printable line-art pages. Results may include mistakes, artifacts, odd details, or unexpected interpretations of a prompt.",
  },
  {
    title: "Family-Friendly Review",
    body: "The service is designed for kid-friendly prompts, but AI is not perfect. Adults should review generated pages before giving them to children or using them in a classroom.",
  },
  {
    title: "Page Packs and Availability",
    body: "Page packs depend on third-party services including Stripe, OpenAI, Supabase, and Resend. Payment confirmation does not guarantee uninterrupted service or a perfect result.",
  },
  {
    title: "Copyrighted or Trademarked Characters",
    body: "Do not request protected characters, brand-owned characters, or copyrighted material. Users are responsible for prompts and how generated images are used.",
  },
  {
    title: "User Responsibility",
    body: "Generated images are intended for personal, educational, and creative use. You are responsible for complying with applicable laws, school rules, and intellectual property requirements.",
  },
  {
    title: "Support",
    body: "If a technical issue prevents a paid generation from completing, contact support with your checkout email, Stripe receipt, or studio link details so we can review it.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <section className="mb-8 rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Disclaimer</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Content Disclaimer</h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-600">
          PaziPagesAI is a creative tool for generating printable coloring pages.
          Please read these notes before using generated content.
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
        <h2 className="text-2xl font-bold text-gray-950">Contact Support</h2>
        <p className="mt-2 text-gray-700">
          Use the{" "}
          <a href="/contact" className="font-semibold text-[#2563eb] underline">
            contact form
          </a>{" "}
          for questions or concerns.
        </p>
      </section>
    </main>
  );
}
