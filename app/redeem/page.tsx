"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type RedeemResponse = {
  ok?: boolean;
  alreadyRedeemed?: boolean;
  studioUrl?: string;
  campaign?: {
    code: string;
    label: string;
  };
  creditSession?: {
    access_token: string;
    credits_purchased: number;
    credits_remaining: number;
  };
  error?: string;
};

function RedeemContent() {
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get("code")?.trim().toUpperCase() ?? "";
  const [code, setCode] = useState(codeFromUrl);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RedeemResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setCode(codeFromUrl);
  }, [codeFromUrl]);

  async function redeemPromo(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError("");

    try {
      const cleanCode = code.trim().toUpperCase();
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanCode) {
        throw new Error("Enter a promo code.");
      }

      if (!cleanEmail || !cleanEmail.includes("@")) {
        throw new Error("Enter a valid email address.");
      }

      const res = await fetch("/api/promos/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: cleanCode, email: cleanEmail }),
      });

      const data = (await res.json()) as RedeemResponse;

      if (!res.ok) {
        throw new Error(data.error || "Unable to redeem promo code.");
      }

      if (data.creditSession?.access_token) {
        localStorage.setItem("paziCreditToken", data.creditSession.access_token);
      }

      setResult(data);
      setEmail("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <section className="rounded-lg border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb]">
          Promo code
        </p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950">Redeem a Free Coloring Page</h1>
        <p className="mt-3 leading-relaxed text-gray-600">
          Enter your promo code and email address to claim a private studio link.
          If the promo is active and available, we will email the link so you can
          create your page without an account.
        </p>

        <form onSubmit={redeemPromo} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-semibold">Promo code</label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="LAUNCH50"
              className="w-full rounded-lg border bg-white px-4 py-3 text-base uppercase"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border bg-white px-4 py-3 text-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !code.trim() || !email.trim()}
            className="w-full rounded-lg bg-[#2563eb] px-5 py-3 font-semibold text-white transition hover:bg-[#1e4fc2] disabled:opacity-50"
          >
            {isLoading ? "Redeeming..." : "Redeem Promo"}
          </button>
        </form>

        {error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        {result?.ok && result.studioUrl && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-5">
            <h2 className="text-xl font-bold text-gray-950">
              {result.alreadyRedeemed ? "Studio Link Resent" : "Your Free Page Is Ready"}
            </h2>
            <p className="mt-2 text-gray-700">
              We emailed your private studio link. You can also open it now from this device.
            </p>
            <Link
              href={result.studioUrl}
              className="mt-4 inline-flex rounded-lg bg-[#2563eb] px-5 py-3 font-semibold text-white transition hover:bg-[#1e4fc2]"
            >
              Open Private Studio
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default function RedeemPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-gray-700">Loading promo code...</p>
        </main>
      }
    >
      <RedeemContent />
    </Suspense>
  );
}
