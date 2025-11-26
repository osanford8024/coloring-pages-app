import AdUnit from "./components/AdUnit";

export const metadata = {
  title: "PaziPagesAI – AI Coloring Page Generator",
  description:
    "Create fun, kid-friendly, printable coloring pages instantly using AI. Safe, clean, and optimized for standard 8.5×11 paper.",
};

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* HERO */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-[#2563eb]">PaziPagesAI</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Generate fun, high-quality, kid-friendly coloring pages instantly.
          Explore the gallery or create your own printable page in seconds.
        </p>

        <AdUnit slot="2296616571" />

        <div className="mt-8 flex justify-center gap-4 flex-wrap">

          {/* Primary Button — Brand Blue */}
          <a
            href="/generate"
            className="px-6 py-3 bg-[#2563eb] text-white rounded-lg text-lg font-medium hover:bg-[#1e4fc2] transition"
          >
            Get a Coloring Page
          </a>

          {/* Secondary Button — White Outline */}
          <a
            href="/gallery"
            className="px-6 py-3 bg-white border border-[#2563eb] text-[#2563eb] rounded-lg text-lg font-medium hover:bg-blue-50 transition"
          >
            View Gallery
          </a>

          {/* Tertiary Button — Light Blue Background */}
          <a
            href="/how-it-works"
            className="px-6 py-3 bg-blue-100 text-[#2563eb] rounded-lg text-lg font-medium hover:bg-blue-200 transition"
          >
            How It Works
          </a>

        </div>
      </section>

      {/* SECTION 1 — WHAT IS PAZIPAGESAI */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">What Is PaziPagesAI?</h2>
        <p className="text-gray-700 leading-relaxed">
          PaziPagesAI is a family-friendly platform that turns creative ideas
          into clean, printable coloring pages using safe AI technology.
          Whether you're a parent looking for quick activities, a teacher
          preparing classroom materials, or a young artist exploring
          imagination, PaziPagesAI makes it easy to generate fun designs
          that print perfectly on standard 8.5×11 paper. No drawing skills
          required — just describe what you want, and the generator does
          the rest.
        </p>
      </section>

      {/* SECTION 2 — BENEFITS OF COLORING */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Why Kids Love Coloring</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Coloring isn’t just fun — it supports childhood development in
          dozens of ways. Creative coloring activities help children:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Improve fine motor skills and hand–eye coordination</li>
          <li>Express emotions and develop imagination</li>
          <li>Build focus, patience, and confidence</li>
          <li>Learn shapes, animals, characters, and storytelling</li>
          <li>Relax and reduce stress through calming art time</li>
        </ul>

        <p className="text-gray-700 leading-relaxed mt-4">
          That’s why PaziPagesAI was designed to make high-quality,
          kid-friendly pages accessible anytime, anywhere.
        </p>
      </section>

      {/* SECTION 3 — POPULAR CATEGORIES */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Popular Coloring Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          <a href="/gallery?category=Animals" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center">Animals</a>
          <a href="/gallery?category=Dinosaurs" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center">Dinosaurs</a>
          <a href="/gallery?category=Fantasy" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center">Fantasy</a>
          <a href="/gallery?category=Cars" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center">Cars</a>
          <a href="/gallery?category=Space" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center">Space</a>
          <a href="/gallery?category=Food" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center">Food</a>
        </div>
      </section>

      {/* SECTION 4 — WHO IT HELPS */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Perfect for Parents, Teachers & Young Creators
        </h2>
        <p className="text-gray-700 leading-relaxed">
          PaziPagesAI is used by families, educators, counselors, and
          after-school programs around the world. It provides instant access
          to safe, unique illustrations that help children stay creative,
          engaged, and curious. Whether you need a last-minute activity, new
          classroom worksheets, or a fun art challenge, the generator makes
          it fast and accessible.
        </p>
      </section>

      {/* FOOTER AD */}
      <div className="my-10 flex justify-center">
        <AdUnit slot="2652017409" />
      </div>
    </div>
  );
}
