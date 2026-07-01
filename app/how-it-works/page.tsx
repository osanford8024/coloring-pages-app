export const metadata = {
  title: "How It Works | PaziPagesAI",
  description:
    "Learn how PaziPagesAI turns paid prompts into clean, kid-friendly, printable coloring pages using safe AI technology.",
};

export default function HowItWorksPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">How It Works</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI turns your ideas into clean, printable coloring pages. The
        generator now uses a checkout-first flow: you enter a prompt, complete
        secure payment, and then your page is created and prepared for download.
        No account or login is required.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        1. Enter Your Idea as a Prompt
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        In the Generate section, type what you want to see. Prompts can be
        simple or detailed, depending on your creativity. Examples include:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>A happy dinosaur riding a scooter</li>
        <li>A cat baking cupcakes in a kitchen</li>
        <li>A robot watering flowers in a garden</li>
        <li>Two kids exploring outer space</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mb-6">
        Clear, specific prompts usually produce cleaner, more print-ready
        coloring pages.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        2. Complete Secure Checkout
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        When you click the create button, you are sent to Stripe Checkout. Stripe
        securely processes the payment. PaziPagesAI does not store your full card
        details. Your prompt is attached to the paid checkout session so the
        image can be created after payment is confirmed.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        3. AI Creates Your Coloring Page
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        After payment, you return to a progress page. The server verifies the
        paid Stripe session, creates your black-and-white line-art illustration,
        uploads it to Supabase Storage, and prepares the printable file.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        4. Download or Print Instantly
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        When generation finishes, you can download the PNG, print it, save it
        for later, or create another page. Completed pages may also appear in the
        public gallery unless removed for quality, safety, or moderation reasons.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Tips for Better Results
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Here are a few tips for making the most of the generator:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Use descriptive words like cute, simple, friendly, or happy.</li>
        <li>Add an action such as riding, playing, building, or exploring.</li>
        <li>Specify details like animals, themes, holidays, or settings.</li>
        <li>Keep prompts age-appropriate for the best kid-safe output.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        If Something Goes Wrong
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        AI generation and third-party services can occasionally fail. If a paid
        generation does not complete, save the checkout/session information shown
        in your browser and contact support so we can review it.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        How We Keep It Safe
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI uses prompt guidance, provider safety systems, and review
        practices to avoid harmful, adult, violent, copyrighted, or inappropriate
        content. While no AI system is perfect, we actively improve the service
        to keep the experience family-friendly and educational.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Questions?</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        If you have questions about how PaziPagesAI works, need help with a
        prompt, or need support, reach out anytime:
      </p>

      <p className="text-blue-600 font-medium text-lg break-all">
        support@pazipagesai.com
      </p>

      <p className="text-gray-500 text-sm mt-12">
        Last Updated: {new Date().getFullYear()}
      </p>
    </main>
  );
}
