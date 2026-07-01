"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: July 2026
      </p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            PaziPagesAI ("we", "us", "our") provides an AI-powered coloring
            page generator that allows users to create, store, download, and
            print custom images. We are committed to handling personal
            information responsibly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <h3 className="font-semibold mt-4 mb-1">Information You Provide</h3>
          <p>
            We collect prompts or descriptions you enter to create images,
            support messages you send us, and optional contact information if
            you contact us or sign up for updates.
          </p>

          <h3 className="font-semibold mt-4 mb-1">Payment-Related Data</h3>
          <p>
            Paid generation is processed through Stripe Checkout. Stripe may
            collect payment details, billing information, device information,
            and fraud-prevention data. PaziPagesAI does not store your full card
            number. We may store a Stripe checkout session identifier, payment
            status, prompt, generation status, and the completed image URL so we
            can create and deliver your coloring page without requiring an
            account.
          </p>

          <h3 className="font-semibold mt-4 mb-1">
            Automatically Collected Information
          </h3>
          <p>
            We may collect non-identifying analytics such as IP address, device
            type, browser type, referring URLs, and general usage behavior to
            improve site performance, security, and reliability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Image and Data Storage
          </h2>

          <h3 className="font-semibold mt-4 mb-1">AI-Generated Images</h3>
          <p>
            Images generated through PaziPagesAI are stored in Supabase Storage.
            Metadata including the prompt, category, tags, created date, and
            generation job information may also be stored to support the gallery,
            downloads, support requests, moderation, and abuse prevention.
          </p>

          <h3 className="font-semibold mt-4 mb-1">AI Services</h3>
          <p>
            Your prompts are sent to our third-party AI provider, such as
            OpenAI, to generate your requested images. These providers may
            process prompts and outputs according to their own security, abuse
            monitoring, and retention practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            4. Cookies and Tracking
          </h2>
          <p>
            We use cookies and similar technologies for essential site
            functionality, analytics, checkout, and abuse
            prevention. You can disable cookies in your browser settings, but
            some features may not work correctly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Third-Party Providers
          </h2>
          <p>
            We use providers such as Stripe, Supabase, and OpenAI to operate the service. These providers may process device data, cookies, prompts, payment-session information, and service usage data according to their own policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            6. How We Use Your Information
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Provide and improve our services</li>
            <li>Process checkout and verify paid generation sessions</li>
            <li>Generate, store, and deliver AI-created images</li>
            <li>Maintain website functionality, security, and abuse prevention</li>
            <li>Analyze site performance and usage trends</li>
            <li>Respond to support requests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Data Security</h2>
          <p>
            We use HTTPS, secure third-party services, Supabase storage, and
            restricted server-side API access to protect your data. While no
            system is completely secure, we work to improve our safeguards over
            time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Your Rights</h2>
          <p>You may request access, correction, or deletion of data we store.</p>
          <p className="mt-4">
            To submit a request, email us at:{" "}
            <a href="mailto:support@pazipagesai.com" className="text-blue-600 underline">
              support@pazipagesai.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Children's Privacy</h2>
          <p>
            PaziPagesAI is not directed toward children under 13. We do not
            knowingly collect personal information from children. If you believe
            a child has used our service in a way that provided personal
            information, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            10. Changes to This Policy
          </h2>
          <p>
            We may revise this Privacy Policy periodically. Updates will be
            posted on this page with the Last Updated date refreshed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or how we handle
            data, contact us at:
          </p>
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
