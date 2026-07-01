"use client";

import React from "react";

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 2026</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By using PaziPagesAI ("the Service", "we", "our"), you agree to
            these Terms of Service. If you do not agree, please discontinue use
            of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Description of Service</h2>
          <p>
            PaziPagesAI provides an AI-powered coloring page generator that lets
            users create, save, download, and print AI-generated coloring pages.
            Custom generation uses a checkout-first flow: a user submits a
            prompt, completes payment through Stripe, and then the image is
            generated after payment is verified.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
          <p>By using PaziPagesAI, you agree that you will not:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Use the Service for illegal, harmful, or abusive purposes</li>
            <li>Request content that violates laws, copyrights, or trademarks</li>
            <li>Attempt to interfere with or damage the Service or infrastructure</li>
            <li>Misuse AI-generated images in ways prohibited by provider policies</li>
            <li>Attempt to bypass checkout or access paid generation without payment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. AI-Generated Content</h2>
          <h3 className="font-semibold mt-4 mb-1">4.1 Ownership and Use</h3>
          <p>
            Subject to applicable law and provider policies, you are responsible
            for how you use, publish, or distribute images generated from your
            prompts. You are also responsible for ensuring your prompts and uses
            do not violate third-party rights.
          </p>

          <h3 className="font-semibold mt-4 mb-1">4.2 Output Quality</h3>
          <p>
            AI-generated content may contain mistakes, artifacts, unexpected
            details, or unsuitable results. We work to guide and improve output
            quality, but we do not guarantee that every result will meet your
            expectations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Storage and Data Handling</h2>
          <p>
            Images generated through the Service may be stored in Supabase
            Storage and may be listed in the public gallery. Generation job
            records may include a Stripe checkout session identifier, prompt,
            status, image URL, and related metadata. We reserve the right to
            delete stored files for moderation, maintenance, abuse prevention,
            or storage limitations.
          </p>
          <p className="mt-3">
            You are responsible for downloading and saving any content you wish
            to preserve.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Payments and Monetization</h2>
          <p>
            PaziPagesAI may charge for custom coloring page generation and other digital services. By using paid features, you agree to checkout, payment processing, and related provider practices described in our Privacy Policy and applicable provider policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7. Payment, Purchases, and Refunds
          </h2>
          <p>
            Paid custom coloring page generation is processed by Stripe. Payment
            must be completed before generation begins. All purchases are for
            digital services and are generally final unless required by law.
          </p>
          <p className="mt-3">
            If a paid generation fails because of a technical issue, contact
            support with your checkout/session information so we can review the
            transaction and help resolve the issue.
          </p>
          <p className="mt-2">
            <a href="mailto:support@pazipagesai.com" className="text-blue-600 underline">
              support@pazipagesai.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Third-Party Services</h2>
          <p>
            PaziPagesAI integrates with services such as OpenAI, Supabase, and Stripe. Your use of the platform may also be subject to
            the terms and policies of these providers.
          </p>
          <p className="mt-3">
            We are not responsible for outages, errors, payment declines, or
            data handling by third-party vendors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Disclaimer of Warranties</h2>
          <p>
            The Service is provided as is and without warranties of any kind,
            whether express or implied. We do not guarantee that the Service
            will be uninterrupted, error-free, or meet your expectations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Limitation of Liability</h2>
          <p>
            PaziPagesAI shall not be liable for damages arising from your use of
            the Service, including loss of data, lost profits, payment provider
            issues, or misuse of generated images. Your sole remedy is to
            discontinue use of the Service, except where prohibited by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">11. Termination</h2>
          <p>
            We may suspend or terminate access to the Service at any time for
            violations of these Terms or activities deemed harmful to the
            platform or its users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">12. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Updates will be posted
            on this page with the Last Updated date revised. By continuing to
            use the Service, you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">13. Contact Us</h2>
          <p>If you have questions regarding these Terms, contact us at:</p>
          <p className="mt-2">
            <a href="mailto:support@pazipagesai.com" className="text-blue-600 underline">
              support@pazipagesai.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
