"use client";

import { useState } from "react";

type DownloadPayButtonProps = {
  imageUrl: string;
  label?: string;
  price?: number; // in cents (optional)
};

export default function DownloadPayButton({
  imageUrl,
  label = "Download Printable – $0.89",
  price = 89, // default price (Stripe requires ≥ 50 cents)
}: DownloadPayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch("/api/stripe/pay-per-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          price, // <--- send price to Stripe route
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        console.error("Checkout error:", data);
        setErrorMsg(data.error || "Unable to start checkout.");
        setLoading(false);
        return;
      }

      window.location.href = data.url as string;
    } catch (err) {
      console.error("Download purchase error:", err);
      setErrorMsg("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {errorMsg && (
        <p className="mb-2 text-sm text-red-600 font-medium">{errorMsg}</p>
      )}

      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {loading ? "Redirecting to checkout…" : label}
      </button>
    </div>
  );
}
