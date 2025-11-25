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
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Generate fun, unique, high-quality coloring pages using AI.
          Explore our gallery or create your own instant coloring page.
        </p>

        
        <AdUnit slot="2296616571" />


        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/generate"
            className="px-6 py-3 bg-black text-white rounded-lg text-lg font-medium hover:bg-gray-800"
          >
            Get a Coloring Page
          </a>

          <a
            href="/gallery"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg text-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            View Gallery
          </a>
        </div>
      </section>

    </div>
  );
}
