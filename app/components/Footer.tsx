export default function Footer() {
  return (
    <footer className="w-full border-t bg-white h-[60px] flex items-center justify-center">
      <div className="text-sm text-gray-600 flex items-center gap-4">

        <span className="font-medium text-gray-800">
          PaziPagesAI
        </span>

        <span className="text-gray-400">•</span>

        <a href="/privacy" className="hover:text-black transition-colors">
          Privacy Policy
        </a>

        <span className="text-gray-400">•</span>

        <a href="/terms" className="hover:text-black transition-colors">
          Terms of Service
        </a>

        <span className="text-gray-400">•</span>

        <a href="/cookies" className="hover:text-black transition-colors">
          Cookie Policy
        </a>

        <span className="text-gray-400">•</span>

        <a href="/disclaimer" className="hover:text-black transition-colors">
          Content Disclaimer
        </a>

      </div>
    </footer>
  );
}
