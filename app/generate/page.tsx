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

    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>Print Coloring Page</title>
          <style>
            @page { margin: 0; size: auto; }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            img {
              max-height: 95vh;
              width: auto;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" />
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);

    win.document.close();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Generate a Coloring Page</h1>
        <p className="text-gray-600 mt-2">
          Describe your idea and instantly create a printable coloring page.
        </p>
      </div>

      <div className="my-6 flex justify-center">
        <AdUnit slot="9021258288" />
      </div>

      <form
        onSubmit={generateImage}
        className="bg-white rounded-2xl shadow-md p-6 space-y-4"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: a baby dragon holding balloons while sitting on a cloud"
            rows={5}
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
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}
      </form>

      {loading && (
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <SketchLoader />
        </div>
      )}

      {!loading && imageUrl && (
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <img
            src={imageUrl}
            alt="Generated coloring page"
            className="w-full rounded-lg border"
          />

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

      <div className="my-10 flex justify-center">
        <AdUnit slot="2652017409" />
      </div>
    </main>
  );
}
