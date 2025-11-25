"use client";

import React from "react";

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: November 2025</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By using PaziPagesAI (“the Service”, “we”, “our”), you agree to these
            Terms of Service. If you do not agree, please discontinue use of the
            platform immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Description of Service</h2>
          <p>
            PaziPagesAI provides an AI-powered coloring page generator that allows
            users to create, save, and download AI-generated images. We may
            update, improve, or modify the Service at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
          <p>By using PaziPagesAI, you agree that you will not:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Use the Service for illegal, harmful, or abusive purposes</li>
            <li>Upload or request content that violates laws or copyrights</li>
            <li>Attempt to interfere with or damage the Service or its infrastructure</li>
            <li>Misuse AI-generated images in ways prohibited by OpenAI or Supabase</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. AI-Generated Content</h2>
          <h3 className="font-semibold mt-4 mb-1">4.1 Ownership</h3>
          <p>
            You own the rights to the images generated from your prompts, subject
            to OpenAI’s usage policies. You are responsible for how you use,
            publish, or distribute the generated images.
          </p>

          <h3 className="font-semibold mt-4 mb-1">4.2 Restrictions</h3>
          <p>
            You may not use AI-generated content to create harmful, misleading,
            or illegal material. You may not portray generated images as
            real photographs or claim they depict actual persons without consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Storage & Data Handling</h2>
          <p>
            Images generated through the Service may be stored in Supabase
            Storage. We reserve the right to delete stored files for maintenance,
            abuse prevention, or storage limitations.
          </p>
          <p className="mt-3">
            You are responsible for downloading and saving any content you wish
            to preserve.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Advertising & Monetization</h2>
          <p>
            PaziPagesAI may display advertisements, including Google AdSense
            ads. By using the Service, you agree to the collection of advertising
            data in accordance with our Privacy Policy and Google’s policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7. Payment, Purchases & Refunds
          </h2>
          <p>
            Some features (including digital coloring book purchases) may incur
            a charge. All purchases are final unless required by law. Refund
            requests may be submitted to:
          </p>
          <p className="mt-2">
            <a
              href="mailto:support@pazipagesai.com"
              className="text-blue-600 underline"
            >
              support@pazipagesai.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Third-Party Services</h2>
          <p>
            PaziPagesAI integrates with services such as OpenAI, Supabase,
            Stripe, and Google. Your use of the platform is also subject to the
            terms and policies of these providers.
          </p>
          <p className="mt-3">
            We are not responsible for outages, errors, or data handling by
            third-party vendors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Disclaimer of Warranties</h2>
          <p>
            The Service is provided “as is” and without warranties of any kind,
            whether express or implied. We do not guarantee that the Service will
            be uninterrupted, error-free, or meet your expectations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Limitation of Liability</h2>
          <p>
            PaziPagesAI shall not be liable for any damages arising from your use
            of the Service, including loss of data, lost profits, or misuse of
            generated images. Your sole remedy is to discontinue use of the
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">11. Termination</h2>
          <p>
            We may suspend or terminate access to the Service at any time for
            violations of these Terms or for activities deemed harmful to the
            platform or its users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">12. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Updates will be posted
            on this page with the “Last Updated” date revised accordingly. By
            continuing to use the Service, you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">13. Contact Us</h2>
          <p>If you have any questions regarding these Terms, contact us at:</p>
          <p className="mt-2">
            📧{" "}
            <a
              href="mailto:support@pazipagesai.com"
              className="text-blue-600 underline"
            >
              support@pazipagesai.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
