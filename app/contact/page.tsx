import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | PaziPagesAI",
  description:
    "Contact PaziPagesAI for page pack support, lost studio links, billing questions, feedback, and family-friendly AI coloring page help.",
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 leading-relaxed">
          Send a message for support, billing questions, feedback, or help with
          a page pack. If your question is about a purchase, include the email
          used at checkout so we can review it faster.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        <ContactForm />

        <aside className="space-y-4">
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
            <h2 className="text-xl font-bold mb-2">Lost Your Studio Link?</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              If you already bought a page pack, try recovering the private
              studio link first.
            </p>
            <Link
              href="/generate/recover"
              className="inline-block w-full text-center px-4 py-2 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-[#1e4fc2] transition"
            >
              Recover Link
            </Link>
          </section>

          <section className="rounded-lg border bg-white p-5">
            <h2 className="text-xl font-bold mb-2">Support Email</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              You can also email us directly.
            </p>
            <a
              href="mailto:support@pazipagesai.com"
              className="text-[#2563eb] font-medium break-all hover:underline"
            >
              support@pazipagesai.com
            </a>
          </section>

          <section className="rounded-lg border bg-white p-5">
            <h2 className="text-xl font-bold mb-2">Response Time</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Most messages are answered within 24 to 48 hours. Weekends and
              holidays may take a bit longer.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
