export const metadata = {
  title: "Content Disclaimer | PaziPagesAI",
  description:
    "Important information about AI-generated images, content safety, accuracy, copyright, and user expectations on PaziPagesAI.",
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Content Disclaimer</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        The information, images, and tools provided on{" "}
        <strong>PaziPagesAI</strong> are intended for creative, educational,
        and recreational use. By using this website, you acknowledge and agree
        to the terms outlined in this Content Disclaimer.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        AI-Generated Content
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        All illustrations generated on this website are created using
        artificial intelligence (AI). While we strive to produce clean,
        safe-for-kids coloring pages, AI-generated content may sometimes
        include minor imperfections, inconsistencies, or inaccuracies. We
        review and filter results whenever possible, but we cannot guarantee
        that all outputs will be error-free.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        No Copyrighted or Trademarked Characters
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI does not intentionally create or promote content based on
        copyrighted, trademarked, or brand-owned characters (including but not
        limited to Disney, Marvel, Pixar, Nintendo, and other franchises).
        Users are responsible for ensuring their prompts do not request
        protected characters or intellectual property. Any resemblance to
        copyrighted characters is purely coincidental and unintentional.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Safety and Kid-Friendly Guidelines
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        We aim to maintain a safe and family-friendly environment. Our
        generation guidelines help prevent harmful, adult, violent, or
        inappropriate content. However, since outputs are generated from user
        prompts, we cannot guarantee full prevention of undesired content in
        every case. If you encounter an image that seems inappropriate or not
        suitable for children, please contact us immediately so we can review
        and remove it.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Accuracy of Information
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        While we work hard to ensure that all information and tools on
        PaziPagesAI are accurate and up-to-date, we cannot guarantee
        completeness, reliability, or suitability for any specific purpose.
        All use of this website is at your own discretion and risk.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        User Responsibility
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        You are responsible for the prompts you provide, how you use the
        generated images, and ensuring compliance with any applicable laws or
        intellectual property rules. Generated images are provided for
        personal, educational, or non-commercial use unless otherwise
        specified.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Limitation of Liability
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI is provided “as-is” without warranties of any kind. We are
        not liable for any damages, losses, or issues arising from the use or
        inability to use the site, including technical errors, AI
        inconsistencies, or user-generated content.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Changes to This Disclaimer
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        We may update or modify this Content Disclaimer at any time. Updated
        versions will be posted on this page with a revised “Last Updated”
        date.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Contact Information
      </h2>
      <p className="text-gray-700 leading-relaxed">
        If you have questions or concerns about this Disclaimer, please reach
        out at:
      </p>

      <p className="text-blue-600 font-medium text-lg break-all mt-2">
        support@pazipagesai.com
      </p>

      <p className="text-gray-500 text-sm mt-12">
        Last Updated: {new Date().getFullYear()}
      </p>
    </main>
  );
}
