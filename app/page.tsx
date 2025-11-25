import AdUnit from "./components/AdUnit";

export const metadata = {
  title: "PaziPagesAI – AI Coloring Page Generator",
  description: "Create fun, unique coloring pages instantly using AI.",
};

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-blue-600">PaziPagesAI</span>
        </h1>

        {/* Removed dark:text-gray-300 */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Generate fun, unique, high-quality coloring pages using AI.
          Explore our gallery or create your own instant coloring page.
        </p>

        <AdUnit slot="2296616571" />

        <div className="mt-8 flex justify-center gap-4">

          {/* Primary Button */}
          <a
            href="/generate"
            className="px-6 py-3 bg-black text-white rounded-lg text-lg font-medium hover:bg-gray-800"
          >
            Get a Coloring Page
          </a>

          {/* Secondary Button — cleaned of dark mode */}
          <a
            href="/gallery"
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg text-lg font-medium hover:bg-gray-300"
          >
            View Gallery
          </a>

        </div>
      </section>

    </div>
  );
}
