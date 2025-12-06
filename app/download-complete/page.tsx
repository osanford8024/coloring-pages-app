// app/download-complete/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DownloadCompletePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setErrorMsg("Missing payment session. Please contact support.");
      return;
    }

    async function fetchDownload() {
      try {
        const res = await fetch(
          `/api/download-coloring-page?session_id=${encodeURIComponent(
            sessionId
          )}`
        );
        const data = await res.json();

        if (res.ok && data.imageUrl) {
          setImageUrl(data.imageUrl);

          // Auto-trigger browser download
          const link = document.createElement("a");
          link.href = data.imageUrl;
          link.download = "coloring-page.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          setErrorMsg(data.error || "Unable to fetch your download.");
        }
      } catch (err) {
        console.error("Download-complete error:", err);
        setErrorMsg("Something went wrong while fetching your download.");
      }
    }

    fetchDownload();
  }, [sessionId]);

  return (
    <main className="max-w-xl mx-auto px-4 pt-28 pb-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>

      {errorMsg && (
        <p className="text-red-600 mb-4">
          {errorMsg}
        </p>
      )}

      {!errorMsg && !imageUrl && (
        <p className="text-gray-700">Confirming your payment…</p>
      )}

      {imageUrl && (
        <div className="space-y-2">
          <p className="text-gray-700">
            Your download should start automatically. If it doesn&apos;t, click
            the button below.
          </p>
          <a
            href={imageUrl}
            download="coloring-page.png"
            className="inline-block px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8]"
          >
            Download Again
          </a>
        </div>
      )}
    </main>
  );
}
