import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const MAINTENANCE_MODE = false; // turn OFF when ready

export const metadata = {
  title: "PaziPagesAI",
  description: "Generate custom coloring pages instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // 🔧 If maintenance mode is on — show maintenance screen everywhere
  if (MAINTENANCE_MODE) {
    return (
      <html lang="en">
        <body className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="text-center p-10">
            <h1 className="text-4xl font-bold mb-4">We'll be back soon!</h1>
            <p className="text-lg">
              We're performing some upgrades. Please check back shortly.
            </p>
          </div>
        </body>
      </html>
    );
  }

  // 🔥 Normal site view
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Google Ads Script */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9912633892959880"
        crossOrigin="anonymous"
      ></script>

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
