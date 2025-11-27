import Image from "next/image";

export const metadata = {
  title: "PaziPagesAI Blog | Tips, Ideas & Creative Resources",
  description:
    "Explore creative tips, kid-friendly coloring ideas, AI prompt guides, and helpful resources for families and teachers using PaziPagesAI.",
};

export default function BlogHomePage() {
  const posts = [
    {
      title: "20 Fun Coloring Page Ideas for Kids (Printable List)",
      description:
        "A collection of creative, kid-friendly coloring ideas to spark imagination and help children explore new themes.",
      href: "/blog/coloring-ideas",
      thumbnail: "/blog/thumbnails/ideas.png",
      date: "Updated 2025",
    },
    {
      title: "Top 10 Benefits of Coloring for Children’s Development",
      description:
        "Learn how coloring helps kids build focus, creativity, fine motor skills, and emotional expression.",
      href: "/blog/benefits-of-coloring",
      thumbnail: "/blog/thumbnails/benefits.png",
      date: "Updated 2025",
    },
    {
      title: "How to Write Great Prompts for AI Coloring Pages (Beginner Guide)",
      description:
        "A simple guide to writing effective prompts for clean, printable AI-generated coloring pages.",
      href: "/blog/ai-coloring-guide",
      thumbnail: "/blog/thumbnails/prompts.png",
      date: "Updated 2025",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      {/* HEADER */}
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">PaziPagesAI Blog</h1>
        <p className="text-gray-700 leading-relaxed">
          Discover creative ideas, parent-friendly tips, and helpful guides for
          generating high-quality coloring pages. Our articles support families,
          teachers, and anyone who loves simple, print-ready creative fun.
        </p>
      </header>

      {/* BLOG GRID */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <a
            key={post.href}
            href={post.href}
            className="group bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-40 mb-4">
              <Image
                src={post.thumbnail}
                alt={`${post.title} thumbnail`}
                fill
                className="object-contain p-4"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#2563eb] transition">
              {post.title}
            </h2>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed flex-grow">
              {post.description}
            </p>

            <span className="text-gray-400 text-xs mt-4">{post.date}</span>
          </a>
        ))}
      </section>

      {/* FOOTER MESSAGE */}
      <div className="text-center text-gray-500 text-sm mt-16">
        More articles coming soon.
      </div>
    </main>
  );
}
