export const metadata = {
  title: "About PaziPagesAI",
  description:
    "Learn about PaziPagesAI, the safe, kid-friendly AI coloring page generator designed for parents, teachers, and young artists.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">About PaziPagesAI</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>PaziPagesAI</strong> was created with one simple mission: to make
        high-quality, kid-friendly coloring pages easier to create for families,
        teachers, therapists, and young artists. Coloring helps children build
        focus, confidence, imagination, and emotional expression, and we wanted
        to make custom printable pages simple to create without drawing skills.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        Using AI technology, PaziPagesAI transforms paid prompts into clean,
        printable black-and-white coloring pages that fit standard 8.5 x 11 inch
        paper. Whether it is a dinosaur riding a scooter, a kitten baking
        cupcakes, or a custom idea from your child, the goal is to make
        creativity fun, safe, and easy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Why PaziPagesAI Exists
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Many coloring sites rely heavily on ads, outdated clip art, or
        low-resolution images that do not print well. We wanted to offer modern,
        customizable line-art illustrations that are high resolution and easy to
        print. Teachers need age-appropriate resources. Parents need quick
        activities. Therapists use art for emotional regulation. PaziPagesAI is
        built to help create those materials quickly.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        A Checkout-First Experience
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Custom generation uses a checkout-first flow. You enter a prompt,
        complete secure payment through Stripe, and then the image is generated.
        This helps keep the service sustainable while avoiding a full account or
        login system. The Stripe checkout session acts as a temporary claim link
        for your completed coloring page.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        A Safe and Kid-Friendly Experience
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        We take child safety seriously. Prompts are guided by best practices to
        avoid copyrighted characters, violent themes, unsafe objects, or content
        not suitable for young audiences. No login is required to browse the
        gallery, and payment information is handled by Stripe rather than stored
        directly by PaziPagesAI.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Who We Are</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI is built by creators who care about education, technology,
        and useful digital tools. What began as a personal project to generate
        custom coloring sheets for our own families has grown into a resource
        for parents, teachers, and kids. We continue to improve the platform to
        provide a smoother, more creative, and more reliable experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Our Commitment to Quality
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        We are committed to maintaining a high-quality, ad-safe experience. All
        illustrations are created for print-ready use, and the gallery is curated
        to highlight useful results. Our priority is delivering content that
        inspires creativity and provides real educational value.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        If you have suggestions, requests, or feedback, we would love to hear
        from you. Your input helps PaziPagesAI remain useful, fun, and
        trustworthy for families everywhere.
      </p>

      <div className="mt-12 p-6 border rounded-xl bg-gray-50">
        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
        <p className="text-gray-700">
          Have questions or suggestions? Reach out anytime at:
        </p>
        <p className="text-blue-600 font-medium mt-2">
          support@pazipagesai.com
        </p>
      </div>
    </main>
  );
}
