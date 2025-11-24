"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  function toggleTheme() {
    const darkMode = !isDark;
    setIsDark(darkMode);

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <nav className="w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* TITLE ONLY */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight dark:text-white">
            PaziPages<strong className="text-blue-600 dark:text-blue-400">AI</strong>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link href="/generate" className="hover:text-blue-600 dark:hover:text-blue-400">Generate</Link>
          <Link href="/gallery" className="hover:text-blue-600 dark:hover:text-blue-400">Gallery</Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden p-2 border rounded-lg dark:border-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 px-4 py-3 space-y-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            href="/generate"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600 dark:hover:text-blue-400"
          >
            Generate
          </Link>

          <Link
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-600 dark:hover:text-blue-400"
          >
            Gallery
          </Link>

          <button
            onClick={toggleTheme}
            className="mt-2 p-2 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
          >
            {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
