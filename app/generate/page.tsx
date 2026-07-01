"use client";

import { useState } from "react";
import AdUnit from "../components/AdUnit";

const PRICE_CENTS = 89;
const MAX_PROMPT_LENGTH = 500;

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const cleanPrompt = prompt.trim();

      if (!cleanPrompt) {
        throw new Error("Enter a prompt before checkout.");
      }

      if (cleanPrompt.length > MAX_PROMPT_LENGTH) {
        throw new Error(`Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer.`);
      }

      const res = await fetch("/api/stripe/create-generation-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: cleanPrompt, price: PRICE_CENTS }),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start checkout.");
      }

      window.location.href = data.url as string;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <div className="text-left mb-6">
        <h1 className="text-4xl font-bold">Generate a Coloring Page</h1>
        <p className="text-gray-600 mt-2">
          Describe your idea, complete checkout, and your printable coloring page
          will be created right after payment.
        </p>
      </div>

      <section className="mb-10 max-w-2xl mx-auto text-gray-700">
        <h2 className="text-2xl font-bold mb-3">How to Get the Best Results</h2>
        <p className="leading-relaxed">
          Creating a coloring page is simple: describe the scene you want, and
          PaziPagesAI will turn it into a clean, printable black-and-white illustration.
        </p>

        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>Who or what the picture should feature</li>
          <li>An activity such as "riding a bike" or "building a sandcastle"</li>
          <li>A simple setting like "in a park" or "at a birthday party"</li>
          <li>Kid-friendly adjectives: "cute," "simple," "happy," "playful," etc.</li>
        </ul>

        <p className="leading-relaxed mt-4">
          Every page is generated in a print-ready layout that fits standard
          8.5 x 11 inch paper with no borders or cut-off edges.
        </p>
      </section>

      <div className="my-6 flex justify-center">
        <AdUnit slot="9021258288" />
      </div>

      <form
        onSubmit={startCheckout}
        className="bg-white rounded-2xl shadow-md p-6 space-y-4"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-semibold">Prompt</label>
            <span className="text-xs text-gray-500">
              {prompt.length}/{MAX_PROMPT_LENGTH}
            </span>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: a baby dragon holding balloons while sitting on a cloud"
            rows={5}
            maxLength={MAX_PROMPT_LENGTH}
            className="w-full px-4 py-3 rounded-lg border bg-white resize-none text-base"
            required
          />
        </div>

        <div className="my-4 flex justify-center">
          <AdUnit slot="5278180744" />
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full py-3 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-[#1e4fc2] disabled:opacity-50 transition"
        >
          {loading ? "Opening checkout..." : "Create for $0.89"}
        </button>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}
      </form>

      <div className="my-10 flex justify-center">
        <AdUnit slot="2652017409" />
      </div>
    </main>
  );
}
