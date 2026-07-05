"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SketchLoader from "../../components/SketchLoader";

type Job = {
  id: string;
  prompt: string;
  status: "paid" | "generating" | "complete" | "failed";
  image_url?: string | null;
  error_message?: string | null;
};

function CompleteContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function startGeneration() {
      if (!sessionId) {
        setError("Missing payment session. Please contact support.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const res = await fetch("/api/generation-jobs/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (!isMounted) return;

        if (!res.ok) {
          throw new Error(data?.error || "Unable to create your coloring page.");
        }

        setJob(data.job);
      } catch (err: unknown) {
        if (!isMounted) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to create your coloring page."
        );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    startGeneration();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const imageUrl = job?.image_url || null;

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
              min-height: 100vh;
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
        <h1 className="text-4xl font-bold mb-3">Your Coloring Page</h1>
        <p className="text-gray-600">
          Payment confirmed. We are creating your printable page now.
        </p>
      </div>

      <section className="bg-white rounded-2xl shadow-md p-6">
        {isLoading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-700">
                Payment confirmed
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-[#2563eb]">
                Creating artwork
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-600">
                Preparing download
              </div>
            </div>
            <SketchLoader />
          </div>
        )}

        {!isLoading && error && (
          <div className="space-y-4 text-center">
            <div className="text-red-600 bg-red-50 rounded-lg p-4 text-sm space-y-2">
              <p>{error}</p>
              {sessionId && (
                <p className="text-gray-700 break-all">
                  Reference: <span className="font-mono">{sessionId}</span>
                </p>
              )}
            </div>

            <p className="text-sm text-gray-600">
              If your payment was completed, contact support with the reference
              above so we can review the generation.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="/contact"
                className="inline-block px-4 py-2 rounded-lg border border-[#2563eb] text-[#2563eb] hover:bg-blue-50 transition"
              >
                Contact Support
              </a>
              <a
                href="/generate"
                className="inline-block px-4 py-2 rounded-lg bg-[#2563eb] text-white hover:bg-[#1e4fc2] transition"
              >
                Back to Generator
              </a>
            </div>
          </div>
        )}

        {!isLoading && imageUrl && (
          <div className="space-y-5">
            <div className="relative w-full aspect-[2/3] rounded-lg border overflow-hidden bg-white">
              <Image
                src={imageUrl}
                alt={job?.prompt || "Generated coloring page"}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
                unoptimized
              />
            </div>

            {job?.prompt && (
              <p className="text-sm text-gray-600 text-center">{job.prompt}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={imageUrl}
                download="coloring-page.png"
                className="px-5 py-3 rounded-lg bg-[#16a34a] text-white text-center font-medium hover:bg-[#12863e] transition"
              >
                Download PNG
              </a>
              <button
                onClick={printImage}
                className="px-5 py-3 rounded-lg border border-[#2563eb] text-[#2563eb] font-medium hover:bg-blue-50 transition"
              >
                Print / PDF
              </button>
              <a
                href="/generate"
                className="px-5 py-3 rounded-lg bg-blue-100 text-[#2563eb] text-center font-medium hover:bg-blue-200 transition"
              >
                Create Another
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default function GenerateCompletePage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-3xl mx-auto px-4 pt-28 pb-16 text-center">
          <p className="text-gray-700">Confirming your payment...</p>
        </main>
      }
    >
      <CompleteContent />
    </Suspense>
  );
}


