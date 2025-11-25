"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: November 2025
      </p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            PaziPagesAI (“we”, “us”, “our”) provides an AI-powered coloring
            page generator that allows users to create, store, and download
            custom images. We are committed to protecting your privacy and
            ensuring that your personal information is handled responsibly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <h3 className="font-semibold mt-4 mb-1">Information You Provide</h3>
          <p>
            We collect prompts or descriptions you enter to generate images,
            support messages you send us, and optional contact information if
            you sign up for updates.
          </p>

          <h3 className="font-semibold mt-4 mb-1">
            Automatically Collected Information
          </h3>
          <p>
            We collect non-identifying analytics such as IP address, device
            type, browser type, referring URLs, and general usage behavior to
            improve site performance and reliability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Image & Data Storage
          </h2>

          <h3 className="font-semibold mt-4 mb-1">
            AI-Generated Images
          </h3>
          <p>
            Images generated through PaziPagesAI are stored securely in Supabase
            Storage. Metadata including the prompt, category, tags, and created
            date may also be stored to improve your gallery experience.
          </p>

          <h3 className="font-semibold mt-4 mb-1">AI Services</h3>
          <p>
            Your prompts are sent to our third-party AI provider (such as
            OpenAI) to generate your requested images. These providers may
            temporarily store prompts for security and abuse monitoring.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            4. Cookies & Tracking
          </h2>
          <p>
            We use cookies and similar technologies for essential site
            functionality, analytics, and advertising. You can disable cookies
            at any time in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Advertising (Google AdSense)
          </h2>
          <p>
            We use Google AdSense to display ads. Google may collect device
            data, cookies, and browsing behavior to serve relevant ads. You may
            opt out of personalized advertising at:
          </p>
          <p className="mt-2">
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              className="text-blue-600 underline"
            >
              https://www.google.com/settings/ads
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            6. How We Use Your Information
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Provide and improve our services</li>
            <li>Generate and store AI-created images</li>
            <li>Maintain website functionality and security</li>
            <li>Display personalized or non-personalized ads</li>
            <li>Analyze site performance and usage trends</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Data Security</h2>
          <p>
            We use industry-standard security practices, including HTTPS
            encryption, secure Supabase storage, and restricted API access to
            protect your data. While no system is completely secure, we
            continually improve our safeguards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            8. Your Rights
          </h2>
          <p>You may request:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Access to the data we store</li>
            <li>Correction or deletion of your data</li>
            <li>Restriction of certain processing activities</li>
          </ul>
          <p className="mt-4">
            To submit a request, email us at:{" "}
            <a
              href="mailto:support@pazipagesai.com"
              className="text-blue-600 underline"
            >
              support@pazipagesai.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            9. Children’s Privacy
          </h2>
          <p>
            PaziPagesAI is not directed toward children under 13. We do not
            knowingly collect personal information from children. If you believe
            a child has used our service, please contact us to remove their
            data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            10. Changes to This Policy
          </h2>
          <p>
            We may revise this Privacy Policy periodically. Updates will be
            posted on this page with the “Last Updated” date refreshed
            accordingly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            11. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle
            data, you may contact us at:
          </p>
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
