export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-10 text-center">
      
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
        Create Beautiful  
        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
          AI Coloring Pages
        </span>
        In Seconds
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Turn any idea into a clean, printable black-and-white coloring page.
        Powered by AI, crafted for creators, teachers, parents, and kids.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/generate"
          className="px-8 py-4 rounded-xl text-lg font-semibold text-white bg-black dark:bg-white dark:text-black hover:opacity-90 transition"
        >
          Generate Pages
        </a>

        <a
          href="/gallery"
          className="px-8 py-4 rounded-xl text-lg font-semibold border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Browse Gallery
        </a>
      </div>

      {/* Decorative Grid */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto opacity-80">
        <div className="w-full h-28 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        <div className="w-full h-28 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        <div className="w-full h-28 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        <div className="w-full h-28 bg-gray-100 dark:bg-gray-800 rounded-lg" />
      </div>
    </section>
  );
}
