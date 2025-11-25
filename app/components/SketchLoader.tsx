"use client";

export default function SketchLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-800 dark:text-gray-200">

      {/* Paper */}
      <svg
        width="160"
        height="120"
        viewBox="0 0 200 150"
        className="mb-6"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Paper Rectangle */}
        <rect x="10" y="10" width="180" height="130" rx="8" ry="8" />

        {/* Wavy animated sketch line */}
        <path
          d="
            M 25 45
            Q 45 25, 65 45
            T 105 45
            T 145 45
            T 175 45
          "
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="animate-[sketchWavy_1.8s_ease-in-out_infinite]"
          strokeLinecap="round"
        />

        {/* Faint guide lines */}
        <path d="M25 75 H175" opacity="0.35" />
        <path d="M25 105 H175" opacity="0.35" />
      </svg>

      <p className="text-lg font-medium">Drawing your coloring page…</p>

      <style jsx>{`
        @keyframes sketchWavy {
          0% {
            stroke-dasharray: 0 200;
          }
          50% {
            stroke-dasharray: 120 80;
          }
          100% {
            stroke-dasharray: 0 200;
          }
        }
      `}</style>
    </div>
  );
}
