import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
                  Need help with a recent purchase? Email{" "}
                  <a href="mailto:support@pazipagesai.com" className="font-medium text-[#2563eb] underline">
                    support@pazipagesai.com
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-xl">
                <div className="aspect-[4/5] rounded-lg border-2 border-dashed border-gray-200 bg-[#fffdf8] p-5">
                  <div className="h-full rounded-lg bg-white p-5 shadow-inner">
                    <div className="mx-auto mb-6 h-3 w-24 rounded-full bg-gray-200" />
                    <div className="relative mx-auto h-64 max-w-64">
                      <div className="absolute left-1/2 top-4 h-28 w-28 -translate-x-1/2 rounded-full border-4 border-gray-900" />
                      <div className="absolute left-[22%] top-32 h-20 w-36 rounded-t-full border-4 border-b-0 border-gray-900" />
                      <div className="absolute left-[16%] top-48 h-16 w-44 rounded-lg border-4 border-gray-900" />
                      <div className="absolute left-[33%] top-14 h-3 w-3 rounded-full bg-gray-900" />
                      <div className="absolute right-[33%] top-14 h-3 w-3 rounded-full bg-gray-900" />
                      <div className="absolute left-1/2 top-24 h-8 w-14 -translate-x-1/2 rounded-b-full border-4 border-t-0 border-gray-900" />
                      <div className="absolute left-8 top-24 h-12 w-12 rounded-full border-4 border-gray-900" />
                      <div className="absolute right-8 top-24 h-12 w-12 rounded-full border-4 border-gray-900" />
                    </div>
                    <div className="mt-8 space-y-3">
                      <div className="h-3 rounded-full bg-gray-200" />
                      <div className="h-3 w-4/5 rounded-full bg-gray-200" />
                      <div className="h-3 w-2/3 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>

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





