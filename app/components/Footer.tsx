const footerLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Content Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white min-h-[60px] py-4 flex items-center justify-center">
      <div className="text-sm text-gray-600 flex flex-wrap items-center justify-center gap-4 px-4">
        <span className="font-medium text-gray-800">PaziPagesAI</span>

        {footerLinks.map((link) => (
          <span key={link.href} className="flex items-center gap-4">
            <span className="text-gray-400">&middot;</span>
            <a href={link.href} className="hover:text-black transition-colors">
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </footer>
  );
}
