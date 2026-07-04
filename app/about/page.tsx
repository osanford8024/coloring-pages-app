import Link from "next/link";

export const metadata = {
  title: "About PaziPagesAI",
  description:
    "Learn about PaziPagesAI, the no-login AI coloring page generator for parents, teachers, and young artists.",
};

const values = [
  "Kid-friendly prompts and printable line-art output",
  "No-login page packs with private studio links",
  "Simple recovery by checkout email if a link is lost",
  "A cleaner experience without ad-heavy distractions",
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <section className="mb-10 rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">
          Built for creative families and classrooms
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">About PaziPagesAI</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
          PaziPagesAI helps parents, teachers, and young creators turn simple
          ideas into custom printable coloring pages. The goal is a calm,
          useful tool that makes creative activities easier to prepare.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <article className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950">Why It Exists</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Many coloring sites are cluttered with ads, outdated clip art, or
              images that do not print cleanly. PaziPagesAI focuses on custom,
              black-and-white pages that are easy to print and simple for kids
              to enjoy.
            </p>
          </article>

          <article className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950">How Access Works</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Instead of asking families to create accounts, PaziPagesAI uses
              page packs and private studio links. Buy a pack through Stripe,
              open your private link, and spend one credit for each successful
              coloring page.
            </p>
          </article>

          <article className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950">Our Safety Approach</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              The service is designed for family-friendly prompts and avoids
              harmful, adult, violent, or copyrighted-character requests. AI can
              still make mistakes, so adults should review generated pages before use.
            </p>
          </article>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950">What We Care About</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              {values.map((value) => (
                <li key={value} className="rounded-lg bg-gray-50 p-3">{value}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-xl font-bold text-gray-950">Questions or Feedback?</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Your feedback helps shape a better, more useful coloring page tool.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex w-full justify-center rounded-lg bg-[#2563eb] px-5 py-3 font-semibold text-white transition hover:bg-[#1e4fc2]"
            >
              Contact Us
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
