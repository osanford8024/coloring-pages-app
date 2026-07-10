"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const MAX_PROMPT_LENGTH = 500;

const PACKS = [
  {
    id: "starter",
    title: "Starter",
    pages: 6,
    price: "$5",
    note: "Buy 5, get 1 free",
  },
  {
    id: "popular",
    title: "Family Pack",
    pages: 12,
    price: "$10",
    note: "Buy 10, get 2 free",
  },
  {
    id: "classroom",
    title: "Classroom",
    pages: 30,
    price: "$20",
    note: "Buy 20, get 10 free",
  },
];

type CreditSession = {
  access_token: string;
  credits_purchased: number;
  credits_remaining: number;
  status: "active" | "depleted" | "refunded";
};

type Job = {
  id: string;
  prompt: string;
  status: "paid" | "generating" | "complete" | "failed";
  image_url?: string | null;
  error_message?: string | null;
};

function GenerateContent() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token")?.trim() ?? "";
  const [savedToken, setSavedToken] = useState("");
  const activeToken = tokenFromUrl || savedToken;
  const [prompt, setPrompt] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState("");
  const [generateLoading, setGenerateLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [creditSession, setCreditSession] = useState<CreditSession | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (tokenFromUrl) {
      localStorage.setItem("paziCreditToken", tokenFromUrl);
      setSavedToken(tokenFromUrl);
      return;
    }

    setSavedToken(localStorage.getItem("paziCreditToken") || "");
  }, [tokenFromUrl]);

  useEffect(() => {
    let isMounted = true;

    async function loadCreditSession() {
      if (!activeToken) {
        setCreditSession(null);
        return;
      }

      try {
        setSessionLoading(true);
        setError("");

        const res = await fetch(`/api/credits/session?token=${encodeURIComponent(activeToken)}`);
        const data = await res.json();

        if (!isMounted) return;

        if (!res.ok) {
          throw new Error(data?.error || "Unable to load your page pack.");
        }

        setCreditSession(data.creditSession);
      } catch (err: unknown) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unable to load your page pack.");
      } finally {
        if (isMounted) setSessionLoading(false);
      }
    }

    loadCreditSession();

    return () => {
      isMounted = false;
    };
  }, [activeToken]);

  const imageUrl = job?.image_url || null;

  const studioHref = useMemo(() => {
    return activeToken ? `/generate?token=${activeToken}` : "/generate";
  }, [activeToken]);

  async function startPackCheckout(packId: string) {
    setCheckoutLoading(packId);
    setError("");

    try {
      const res = await fetch("/api/stripe/create-credit-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start checkout.");
      }

      window.location.href = data.url as string;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setCheckoutLoading("");
    }
  }

  async function generateWithCredit(e: React.FormEvent) {
    e.preventDefault();
    setGenerateLoading(true);
    setError("");
    setJob(null);

    try {
      const cleanPrompt = prompt.trim();

      if (!activeToken) {
        throw new Error("Buy a page pack before generating.");
      }

      if (!cleanPrompt) {
        throw new Error("Enter a prompt before generating.");
      }

      if (cleanPrompt.length > MAX_PROMPT_LENGTH) {
        throw new Error(`Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer.`);
      }

      const res = await fetch("/api/credits/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: activeToken, prompt: cleanPrompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unable to create your coloring page.");
      }

      setJob(data.job);
      setCreditSession(data.creditSession);
      setPrompt("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerateLoading(false);
    }
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
    <main className="max-w-5xl mx-auto px-4 pt-28 pb-16">
      <section className="mb-8 rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">Page packs</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Generate Coloring Pages</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-gray-600">
          Buy a pack once, open your private studio link, and create printable
          coloring pages without an account or password.
        </p>
      </section>

      {!activeToken && (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PACKS.map((pack) => (
              <article key={pack.id} className="bg-white rounded-lg shadow-sm p-5 border flex flex-col transition hover:border-[#2563eb]">
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{pack.title}</h2>
                  <p className="text-gray-600 mt-1">{pack.note}</p>
                  <p className="text-3xl font-bold mt-4">{pack.price}</p>
                  <p className="text-sm text-gray-600 mt-1">{pack.pages} custom coloring pages</p>
                </div>
                <button
                  type="button"
                  onClick={() => startPackCheckout(pack.id)}
                  disabled={Boolean(checkoutLoading)}
                  className="mt-5 w-full py-3 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-[#1e4fc2] disabled:opacity-50 transition"
                >
                  {checkoutLoading === pack.id ? "Opening checkout..." : `Buy ${pack.pages} Pages`}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeToken && (
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <form onSubmit={generateWithCredit} className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold">Private Studio</h2>
                <p className="text-gray-600 text-sm break-all">{studioHref}</p>
              </div>
              <div className="rounded-lg bg-blue-50 px-4 py-2 text-[#2563eb] font-semibold text-sm">
                {sessionLoading ? "Loading..." : `${creditSession?.credits_remaining ?? 0} pages left`}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-semibold">Prompt</label>
                <span className="text-xs text-gray-500">{prompt.length}/{MAX_PROMPT_LENGTH}</span>
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
              <p className="text-xs leading-relaxed text-gray-500">
                For cleaner results, ask for simple views like "side view of a race car" or
                "one child standing with a kite". Complex action poses, hands, wheels, and
                extreme angles may be simplified.
              </p>
            </div>

            <button
              type="submit"
              disabled={generateLoading || sessionLoading || !prompt.trim() || !creditSession || creditSession.credits_remaining <= 0}
              className="w-full py-3 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-[#1e4fc2] disabled:opacity-50 transition"
            >
              {generateLoading ? "Creating page..." : "Create 1 Coloring Page"}
            </button>
          </form>

          <aside className="bg-white rounded-lg shadow-sm border p-6 space-y-3 h-fit">
            <h2 className="text-xl font-bold">Page Pack</h2>
            <p className="text-gray-600">
              {creditSession
                ? `${creditSession.credits_remaining} of ${creditSession.credits_purchased} pages remaining.`
                : "Loading your page pack..."}
            </p>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("paziCreditToken");
                window.location.href = "/generate";
              }}
              className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Buy Another Pack
            </button>
          </aside>
        </section>
      )}

      {!activeToken && (
        <section className="mb-10 max-w-2xl mx-auto text-gray-700 space-y-4 rounded-lg border bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold mb-3">How to Get the Best Results</h2>
            <p className="leading-relaxed">
              Describe who should appear, what they are doing, and a simple setting. Kid-friendly words like cute, happy, simple, or playful work well.
            </p>
          </div>
          <p className="text-sm">
            Already bought a page pack?{" "}
            <Link href="/generate/recover" className="text-[#2563eb] underline">
              Recover your studio link
            </Link>
          </p>
        </section>
      )}

      {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg mt-6">{error}</p>}

      {imageUrl && (
        <section className="bg-white rounded-lg shadow-sm border p-6 mt-6 space-y-5">
          <div className="relative w-full max-w-3xl mx-auto aspect-[2/3] rounded-lg border overflow-hidden bg-white">
            <Image
              src={imageUrl}
              alt={job?.prompt || "Generated coloring page"}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-contain"
              unoptimized
            />
          </div>

          {job?.prompt && <p className="text-sm text-gray-600 text-center">{job.prompt}</p>}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={imageUrl} download="coloring-page.png" className="px-5 py-3 rounded-lg bg-[#16a34a] text-white text-center font-medium hover:bg-[#12863e] transition">
              Download PNG
            </a>
            <button onClick={printImage} className="px-5 py-3 rounded-lg border border-[#2563eb] text-[#2563eb] font-medium hover:bg-blue-50 transition">
              Print / PDF
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-3xl mx-auto px-4 pt-28 pb-16 text-center">
          <p className="text-gray-700">Loading generator...</p>
        </main>
      }
    >
      <GenerateContent />
    </Suspense>
  );
}
