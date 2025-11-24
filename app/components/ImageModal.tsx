"use client";

import { useEffect } from "react";

export default function ImageModal({
  isOpen,
  onClose,
  imgUrl,
  prompt,
  onNext,
  onPrev,
}: {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
  prompt: string;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!isOpen) return null;

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      {/* Prevent click bubbling */}
      <div
        className="relative bg-white dark:bg-gray-900 p-4 rounded-xl max-w-3xl w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <img
          src={imgUrl}
          alt={prompt}
          className="w-full rounded-lg max-h-[70vh] object-contain"
        />

        {/* Prompt */}
        <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
          {prompt}
        </p>

        {/* Navigation arrows */}
        <button
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl text-white bg-black/40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/60 transition"
        >
          ‹
        </button>

        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl text-white bg-black/40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/60 transition"
        >
          ›
        </button>

        {/* Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = imgUrl;
              a.download = prompt.replace(/\s+/g, "_") + ".png";
              a.click();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Download
          </button>

          <button
            onClick={() => {
              const win = window.open("", "_blank");
              if (!win) return;

              win.document.write(`
                <html>
                  <head><title>${prompt}</title></head>
                  <body style="margin:0;display:flex;justify-content:center;">
                    <img src="${imgUrl}" style="width:100%;max-width:850px;" />
                  </body>
                </html>
              `);

              win.document.close();
              win.print();
            }}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded-lg"
          >
            Print
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
