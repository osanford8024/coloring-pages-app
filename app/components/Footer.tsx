// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-gray-900 h-[60px] flex items-center justify-center">
      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-4">

        <span className="font-medium text-gray-800 dark:text-gray-200">
          PaziPagesAI
        </span>

        <span className="text-gray-400 dark:text-gray-600">•</span>

        <a href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
          Privacy
        </a>

        <span className="text-gray-400 dark:text-gray-600">•</span>

        <a href="/terms" className="hover:text-black dark:hover:text-white transition-colors">
          Terms
        </a>

      </div>
    </footer>
  );
}
