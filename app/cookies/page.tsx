export const metadata = {
  title: "Cookie Policy | PaziPagesAI",
  description:
    "Learn how PaziPagesAI uses cookies and similar technologies to improve site performance, personalize content, and support safe, family-friendly experiences.",
};

export default function CookiePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        This Cookie Policy explains how <strong>PaziPagesAI</strong> (“we”, “our”, 
        or “the website”) uses cookies and similar tracking technologies when 
        you visit or interact with our site. By using PaziPagesAI, you consent 
        to the use of cookies as described in this policy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        What Are Cookies?
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Cookies are small text files stored on your device when you visit a 
        website. They help websites function correctly, remember your 
        preferences, enhance performance, and provide insights into how users 
        interact with content.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        How We Use Cookies
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        PaziPagesAI uses cookies for the following purposes:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>
          <strong>Essential Cookies:</strong> Required for basic site functions 
          such as navigation, security, and loading pages correctly.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us understand how visitors 
          use the site so we can improve user experience and performance.
        </li>
        <li>
          <strong>Advertising Cookies:</strong> Used by Google AdSense and 
          related services to display relevant ads and limit how often you see 
          the same advertisement.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> (If enabled) These help analyze 
          traffic patterns, popular pages, and user behavior.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Third-Party Cookies (Including Google AdSense)
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI displays ads served by <strong>Google AdSense</strong>. 
        Google may use cookies to:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Show personalized or non-personalized ads</li>
        <li>Measure ad performance</li>
        <li>Prevent invalid click activity</li>
        <li>Improve the relevance of advertisements</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mb-6">
        You can read more about how Google uses data from cookies here:{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Google Ads & Cookie Use
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Managing Your Cookie Preferences
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        You can manage or disable cookies at any time through your browser 
        settings. However, blocking certain cookies may affect your ability to 
        use some features of PaziPagesAI.
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Chrome: Settings → Privacy and Security → Cookies</li>
        <li>Safari: Preferences → Privacy → Cookies</li>
        <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
        <li>Edge: Settings → Site Permissions → Cookies</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Updates to This Policy
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        We may update this Cookie Policy from time to time to reflect changes in 
        technology, legal requirements, or how we operate. Any updates will be 
        posted on this page with a revised “Last Updated” date.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Contact Us
      </h2>
      <p className="text-gray-700 leading-relaxed">
        If you have questions about this Cookie Policy or how cookies are used 
        on PaziPagesAI, feel free to reach out at:
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
