import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import GalleryFeatureImage from "./components/GalleryFeatureImage";

const MAINTENANCE_MODE =
  process.env.VERCEL_ENV === "production" && process.env.MAINTENANCE_MODE !== "false";

export const metadata = {
  title: "PaziPagesAI",
  description: "Generate custom coloring pages instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Maintenance screen
  if (MAINTENANCE_MODE) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-[#f8fafc] text-gray-900">
          <main className="min-h-screen flex items-center justify-center px-4 py-10">
            <section className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#2563eb] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#2563eb]" />
                  PaziPagesAI is getting an upgrade
                </div>

                <div className="space-y-4">
                  <p className="text-lg font-semibold text-[#2563eb]">
                    PaziPagesAI
                  </p>
                  <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                    We are polishing the studio before opening the doors.
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                    The site is temporarily offline while we finish updates for
                    page packs, private studio links, recovery emails, and a
                    smoother support experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900">Page packs</p>
                    <p className="mt-1 text-sm text-gray-600">Create multiple coloring pages from one purchase.</p>
                  </div>
                  <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900">Private links</p>
                    <p className="mt-1 text-sm text-gray-600">No login needed to return to remaining pages.</p>
                  </div>
                  <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900">Support</p>
                    <p className="mt-1 text-sm text-gray-600">Contact and recovery emails are being tuned.</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Need help with a recent purchase? Use the{" "}
                  <a href="/contact" className="font-medium text-[#2563eb] underline">
                    contact form
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-xl">
                <GalleryFeatureImage label="Gallery preview" />

                <div className="mt-5 flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium text-gray-900">Printable coloring pages</span>
                  <span className="rounded-full bg-green-50 px-3 py-1 font-medium text-green-700">Almost ready</span>
                </div>
              </div>
            </section>
          </main>
        </body>
      </html>
    );
  }

  // Normal site view (LIGHT MODE ONLY)
  return (
    <html lang="en">

      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <NavBar />

        <main className="flex-grow pt-20 px-4 max-w-6xl mx-auto">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}





