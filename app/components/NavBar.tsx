"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-md fixed top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* TITLE */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            PaziPages<strong className="text-blue-600">AI</strong>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/generate" className="hover:text-blue-600">Generate</Link>
          <Link href="/gallery" className="hover:text-blue-600">Gallery</Link>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>

        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden p-2 border rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/generate"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            Generate
          </Link>

          <Link
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            Gallery
          </Link>
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            Blog
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            Contact
          </Link>

        </div>
      )}
    </nav>
  );
}
