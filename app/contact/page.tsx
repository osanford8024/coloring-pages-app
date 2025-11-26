export const metadata = {
  title: "Contact Us | PaziPagesAI",
  description:
    "Contact the PaziPagesAI team for support, feedback, questions, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        We’re here to help! Whether you have a question, want to share feedback,
        or need assistance using PaziPagesAI, feel free to reach out anytime.
        We value our users and do our best to respond as quickly as possible.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Support Email</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        The easiest way to contact us is by email. For technical issues,
        account concerns, business inquiries, or content questions, use the
        address below:
      </p>

      <p className="text-blue-600 font-medium text-lg break-all mb-8">
        support@pazipagesai.com
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">What We Can Help With</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Troubleshooting image generation</li>
        <li>Reporting an issue or bug</li>
        <li>Requesting a feature or improvement</li>
        <li>Inquiries related to child safety and content guidelines</li>
        <li>Business and partnership opportunities</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Response Time
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Most emails are answered within <strong>24–48 hours</strong>. During
        weekends or holidays, responses may take a bit longer, but we appreciate
        your patience and always strive to assist you as quickly as possible.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Community & Safety
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI is designed with children and families in mind. If you ever
        encounter an image that feels unsafe, inappropriate, or not kid-friendly,
        please let us know right away. Your feedback helps us improve our
        filtering and continue offering a safe creative space for young artists.
      </p>

      <div className="mt-12 p-6 border rounded-xl bg-gray-50">
        <h3 className="text-xl font-semibold mb-2">We’re Here To Help</h3>
        <p className="text-gray-700">
          Reach out at any time — your input helps make PaziPagesAI better for
          everyone.
        </p>
      </div>
    </main>
  );
}
