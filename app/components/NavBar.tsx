"use client";

import { useState } from "react";
import Link from "next/link";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/generate", label: "Generate" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/generate/recover", label: "Recover Link" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  function closeMenus() {
    setMenuOpen(false);
    setResourcesOpen(false);
  }

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-md fixed top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenus}>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            PaziPages<strong className="text-blue-600">AI</strong>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-gray-700">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-blue-600">
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              className="hover:text-blue-600"
              onClick={() => setResourcesOpen(!resourcesOpen)}
              aria-expanded={resourcesOpen}
            >
              Resources
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-lg border bg-white shadow-lg py-2">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setResourcesOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="md:hidden px-3 py-2 border rounded-lg text-sm font-semibold"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenus}
              className="block hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t pt-3 space-y-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">Resources</p>
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className="block hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
