"use client";

import Link from "next/link";
import { useState } from "react";

export default function RecoverPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function recoverLinks(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail || !cleanEmail.includes("@")) {
        throw new Error("Enter the email used at checkout.");
      }

      const res = await fetch("/api/credits/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unable to send recovery email.");
      }

      setMessage("If that email has any active page packs, the studio link has been sent.");
      setEmail("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto px-4 pt-28 pb-16">
      <section className="bg-white rounded-lg shadow-md p-6 space-y-5">
        <div>
          <h1 className="text-3xl font-bold">Recover Studio Link</h1>
          <p className="text-gray-600 mt-2">
            Enter the email used at checkout and we will send any active page pack links to that inbox.
          </p>
        </div>

        <form onSubmit={recoverLinks} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold" htmlFor="email">Checkout email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border bg-white text-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full py-3 rounded-lg bg-[#2563eb] text-white font-semibold hover:bg-[#1e4fc2] disabled:opacity-50 transition"
          >
            {isLoading ? "Sending..." : "Email My Studio Link"}
          </button>
        </form>

        {message && <p className="text-green-700 text-sm bg-green-50 p-3 rounded-lg">{message}</p>}
        {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

        <Link href="/generate" className="inline-block text-[#2563eb] hover:underline">
          Back to generator
        </Link>
      </section>
    </main>
  );
}
