"use client";

import { useState } from "react";
import AdUnit from "../components/AdUnit";
import SketchLoader from "../components/SketchLoader";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function generateImage(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setImageUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data?.image?.image_url) {
        setImageUrl(data.image.image_url);
      } else {
        throw new Error("No image returned");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function downloadImage() {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "coloring-page.png";
    link.click();
  }

  function printImage() {
    if (!imageUrl) return;
    const win = window.open("");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Print Coloring Page</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; }
            img { max-width: 100%; max-height: 100vh; }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" />
          <script>window.onload = () => window.print();</script>
        </body>
      </html>
    `);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Generate a Coloring Page</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Describe your idea and instantly create a printable coloring page.
        </p>
      </div>

      {/* AD — Top of Page */}
      <div className="my-6 flex justify-center">
        <AdUnit slot="9021258288" />
      </div>

      {/* Form */}
      <form
        onSubmit={generateImage}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4"
      >
        {/* PROMPT TEXTAREA */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: a baby dragon holding balloons while sitting on a cloud"
            rows={5}
            className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 resize-none text-base"
            required
          />
        </div>

        {/* AD — Under Textarea */}
        <div className="my-4 flex justify-center">
          <AdUnit slot="5278180744" />
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {error}
          </p>
        )}
      </form>

      {/* LOADER — shown while generating */}
      {loading && (
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <SketchLoader />
        </div>
      )}

      {/* Image Output */}
      {!loading && imageUrl && (
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <img
            src={imageUrl}
            alt="Generated coloring page"
            className="w-full rounded-lg border dark:border-gray-700"
          />

          {/* AD — Under Generated Image */}
          <div className="my-6 flex justify-center">
            <AdUnit slot="9899225683" />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={downloadImage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Download PNG
            </button>
            <button
              onClick={printImage}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
            >
              Print / PDF
            </button>
          </div>
        </div>
      )}

      {/* AD — Footer / Bottom of Page */}
      <div className="my-10 flex justify-center">
        <AdUnit slot="2652017409" />
      </div>
    </main>
  );
}
