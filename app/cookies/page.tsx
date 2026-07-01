export const metadata = {
  title: "Cookie Policy | PaziPagesAI",
  description:
    "Learn how PaziPagesAI uses cookies and similar technologies to improve site performance and support safe, family-friendly experiences.",
};

export default function CookiePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        This Cookie Policy explains how <strong>PaziPagesAI</strong> uses cookies
        and similar technologies when you visit or interact with our site. By
        using PaziPagesAI, you consent to the use of cookies as described in
        this policy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">What Are Cookies?</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Cookies are small text files stored on your device when you visit a
        website. They help websites function correctly, remember preferences,
        support checkout, enhance performance, and provide insight into how
        visitors interact with content.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">How We Use Cookies</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        PaziPagesAI may use cookies for the following purposes:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>
          <strong>Essential Cookies:</strong> Required for basic site functions
          such as navigation, security, checkout, and loading pages correctly.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us understand how visitors
          use the site so we can improve reliability and user experience.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> If enabled, these help analyze
          traffic patterns, popular pages, and user behavior.
        </li>
        <li>
          <strong>Payment and Security Cookies:</strong> Third-party providers
          such as Stripe may use cookies to process checkout, prevent fraud, and
          keep payments secure.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Third-Party Cookies</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI may rely on third-party providers such as Stripe, Supabase,
        and OpenAI to operate the service. These providers may use cookies or
        similar technologies for checkout, security, abuse prevention, service
        reliability, and analytics according to their own policies.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Managing Your Cookie Preferences
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        You can manage or disable cookies through your browser settings.
        Blocking certain cookies may affect your ability to use checkout or
        other features of PaziPagesAI.
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Chrome: Settings - Privacy and Security - Cookies</li>
        <li>Safari: Preferences - Privacy - Cookies</li>
        <li>Firefox: Options - Privacy & Security - Cookies and Site Data</li>
        <li>Edge: Settings - Site Permissions - Cookies</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Updates to This Policy</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        We may update this Cookie Policy from time to time to reflect changes in
        technology, legal requirements, or how we operate. Updates will be posted
        on this page with a revised Last Updated date.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Contact Us</h2>
      <p className="text-gray-700 leading-relaxed">
        If you have questions about this Cookie Policy, reach out at:
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
