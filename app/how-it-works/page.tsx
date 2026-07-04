export const metadata = {
  title: "How It Works | PaziPagesAI",
  description:
    "Learn how PaziPagesAI page packs, private studio links, AI generation, downloads, and recovery emails work without an account.",
};

const steps = [
  {
    title: "Choose a page pack",
    text: "Pick the pack that fits your home, classroom, or activity plans. Stripe handles checkout securely, and PaziPagesAI does not store your full card details.",
  },
  {
    title: "Open your private studio",
    text: "After payment, you receive a private studio link. That link holds your remaining page credits, so there is no account or password to manage.",
  },
  {
    title: "Describe the coloring page",
    text: "Type a clear, kid-friendly prompt with the subject, action, and setting. Each successful generation uses one page credit.",
  },
  {
    title: "Download or print",
    text: "When the page is ready, download the PNG or print it at home. If you lose the studio link, recover it with the email used at checkout.",
  },
];

const promptTips = [
  "Name who or what should appear in the picture.",
  "Add an action like playing, building, baking, or exploring.",
  "Use a simple setting such as a garden, classroom, park, or moon base.",
  "Keep prompts age-appropriate and avoid copyrighted characters.",
];

export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <section className="mb-10 rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">
          Simple page packs
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">How It Works</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
          PaziPagesAI turns creative ideas into clean, printable coloring pages.
          Buy a page pack once, use your private studio link, and create pages
          without signing up for an account.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-bold text-[#2563eb]">
              {index + 1}
            </div>
            <h2 className="text-xl font-bold text-gray-950">{step.title}</h2>
            <p className="mt-2 leading-relaxed text-gray-600">{step.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-950">Tips for Better Results</h2>
          <p className="mt-2 leading-relaxed text-gray-600">
            Clear prompts usually produce cleaner, more useful coloring pages.
            A strong prompt tells the generator what to draw and keeps the scene simple.
          </p>
          <ul className="mt-5 space-y-3 text-gray-700">
            {promptTips.map((tip) => (
              <li key={tip} className="rounded-lg bg-gray-50 p-3">{tip}</li>
            ))}
          </ul>
        </div>

        <aside className="rounded-lg border border-blue-100 bg-blue-50 p-6 h-fit">
          <h2 className="text-2xl font-bold text-gray-950">Need Your Link?</h2>
          <p className="mt-2 text-gray-700">
            If you already bought a page pack, recover your private studio link
            with the email used at checkout.
          </p>
          <a
            href="/generate/recover"
            className="mt-5 inline-flex w-full justify-center rounded-lg bg-[#2563eb] px-5 py-3 font-semibold text-white transition hover:bg-[#1e4fc2]"
          >
            Recover Studio Link
          </a>
        </aside>
      </section>

      <section className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-950">Safety and Support</h2>
        <p className="mt-2 leading-relaxed text-gray-600">
          PaziPagesAI is designed for family-friendly coloring page prompts. AI
          can still make mistakes, so adults should review pages before giving
          them to children. If a technical issue prevents generation, contact
          support with your checkout email or Stripe receipt.
        </p>
        <p className="mt-4 text-sm text-gray-500">Last updated: July 2026</p>
      </section>
    </main>
  );
}
