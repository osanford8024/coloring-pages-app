"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type CreditSession = {
  access_token: string;
  credits_purchased: number;
  credits_remaining: number;
  status: "active" | "depleted" | "refunded";
};

function CreditsContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [creditSession, setCreditSession] = useState<CreditSession | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function claimCredits() {
      if (!sessionId) {
        setError("Missing payment session. Please contact support.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const res = await fetch("/api/credits/claim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (!isMounted) return;

        if (!res.ok) {
          throw new Error(data?.error || "Unable to confirm your page pack.");
        }

        localStorage.setItem("paziCreditToken", data.creditSession.access_token);
        setCreditSession(data.creditSession);
      } catch (err: unknown) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unable to confirm your page pack.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    claimCredits();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const studioHref = useMemo(() => {
    return creditSession ? `/generate?token=${creditSession.access_token}` : "/generate";
  }, [creditSession]);

  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <section className="bg-white rounded-2xl shadow-md p-6 text-center space-y-5">
        {isLoading && (
          <>
            <h1 className="text-3xl font-bold">Confirming Your Page Pack</h1>
            <p className="text-gray-600">Payment received. We are setting up your private generation link.</p>
          </>
        )}

        {!isLoading && error && (
          <>
            <div className="text-red-600 bg-red-50 rounded-lg p-4 text-sm space-y-2">
              <p>{error}</p>
              {sessionId && <p className="text-gray-700 break-all font-mono">{sessionId}</p>}
            </div>
            <Link href="/generate" className="inline-block px-5 py-3 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-[#1e4fc2] transition">
              Back to Generator
            </Link>
          </>
        )}

        {!isLoading && creditSession && (
          <>
            <div>
              <h1 className="text-3xl font-bold">Your Page Pack Is Ready</h1>
              <p className="text-gray-600 mt-2">
                You have {creditSession.credits_remaining} of {creditSession.credits_purchased} coloring pages left.
              </p>
            </div>

            <div className="rounded-lg border bg-gray-50 p-4 text-left">
              <p className="text-sm font-semibold text-gray-700 mb-1">Private studio link</p>
              <p className="text-sm text-gray-600 break-all">{studioHref}</p>
            </div>

            <Link href={studioHref} className="inline-block px-5 py-3 rounded-lg bg-[#2563eb] text-white font-medium hover:bg-[#1e4fc2] transition">
              Start Creating
            </Link>
          </>
        )}
      </section>
    </main>
  );
}

export default function CreditsPage() {
  return (
    <Suspense
      fallback={
        <main className="max-w-3xl mx-auto px-4 pt-28 pb-16 text-center">
          <p className="text-gray-700">Confirming your page pack...</p>
        </main>
      }
    >
      <CreditsContent />
    </Suspense>
  );
}
