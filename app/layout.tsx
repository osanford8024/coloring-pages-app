// app/layout.tsx
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";   // ✅ THIS MUST MATCH EXACTLY

export const metadata = {
  title: "PaziPagesAI",
  description: "Generate custom coloring pages instantly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
  <NavBar />
  <main className="flex-grow pt-20 px-4 max-w-6xl mx-auto">
    {children}
  </main>
  <Footer />
</body>

    </html>
  );
}
