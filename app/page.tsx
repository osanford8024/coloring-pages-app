import Image from "next/image";
import Link from "next/link";

const pagePacks = [
  { name: "Starter", pages: "5 pages", price: "$5", note: "Try a few custom ideas." },
  { name: "Family Pack", pages: "12 pages", price: "$10", note: "Best value for home activities." },
  { name: "Classroom", pages: "30 pages", price: "$20", note: "Great for lessons and groups." },
];

const previewImages = [
  {
    src: "/blog/thumbnails/prompts.png",
    alt: "Printable coloring page prompt ideas",
    label: "Prompt ideas",
  },
  {
    src: "/blog/thumbnails/classroom-activities.png",
    alt: "Classroom coloring activities",
    label: "Classroom activities",
  },
  {
    src: "/blog/thumbnails/rainy-day.png",
    alt: "Rainy day coloring pages",
    label: "Rainy day pages",
  },
];

const categories = ["Animals", "Dinosaurs", "Fantasy", "Cars", "Space", "Food"];

export const metadata = {
  title: "PaziPagesAI | Custom Printable Coloring Pages",
  description:
    "Buy a page pack and create kid-friendly, printable AI coloring pages with private studio links and no login required.",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <section className="grid min-h-[calc(100vh-160px)] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_460px]">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#2563eb] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
            No login. Just a private studio link.
          </div>

          <div className="space-y-5">
            <p className="text-lg font-semibold text-[#2563eb]">PaziPagesAI</p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-gray-950 sm:text-6xl">
              Custom coloring pages for the exact idea in your head.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
              Buy a page pack once, then turn prompts into clean black-and-white
              printable coloring pages for home, classrooms, rainy days, and
              creative kid projects.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/generate"
              className="inline-flex justify-center rounded-lg bg-[#2563eb] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#1e4fc2]"
            >
              Choose a Page Pack
            </Link>
            <Link
              href="/gallery"
              className="inline-flex justify-center rounded-lg border border-[#2563eb] bg-white px-6 py-3 text-base font-semibold text-[#2563eb] transition hover:bg-blue-50"
            >
              Browse Gallery
            </Link>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-gray-950">12</p>
              <p className="mt-1 text-sm text-gray-600">pages in the popular pack</p>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-gray-950">1</p>
              <p className="mt-1 text-sm text-gray-600">credit per finished page</p>
            </div>
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-2xl font-bold text-gray-950">0</p>
              <p className="mt-1 text-sm text-gray-600">accounts or passwords</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-xl">
          <div className="rounded-lg bg-[#f8fafc] p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-950">Private Studio</p>
                <p className="text-xs text-gray-500">11 pages left</p>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Ready to print
              </span>
            </div>

            <div className="aspect-[4/5] rounded-lg border bg-[#fffdf8] p-5">
              <div className="h-full rounded-lg bg-white p-5 shadow-inner">
                <div className="mx-auto mb-5 h-3 w-24 rounded-full bg-gray-200" />
                <div className="relative mx-auto h-64 max-w-64">
                  <div className="absolute left-1/2 top-4 h-28 w-28 -translate-x-1/2 rounded-full border-4 border-gray-900" />
                  <div className="absolute left-[22%] top-32 h-20 w-36 rounded-t-full border-4 border-b-0 border-gray-900" />
                  <div className="absolute left-[15%] top-48 h-16 w-44 rounded-lg border-4 border-gray-900" />
                  <div className="absolute left-[33%] top-14 h-3 w-3 rounded-full bg-gray-900" />
                  <div className="absolute right-[33%] top-14 h-3 w-3 rounded-full bg-gray-900" />
                  <div className="absolute left-1/2 top-24 h-8 w-14 -translate-x-1/2 rounded-b-full border-4 border-t-0 border-gray-900" />
                  <div className="absolute left-8 top-24 h-12 w-12 rounded-full border-4 border-gray-900" />
                  <div className="absolute right-8 top-24 h-12 w-12 rounded-full border-4 border-gray-900" />
                </div>
                <div className="mt-7 space-y-3">
                  <div className="h-3 rounded-full bg-gray-200" />
                  <div className="h-3 w-4/5 rounded-full bg-gray-200" />
                  <div className="h-3 w-2/3 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold text-gray-950">Pick a pack, then create freely</h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Page packs make the experience feel simple: pay once, keep a private
              link, and use one credit for each successful coloring page.
            </p>
          </div>
          <Link href="/faq" className="font-semibold text-[#2563eb] hover:underline">
            Read the FAQ
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pagePacks.map((pack) => (
            <article key={pack.name} className="rounded-lg border bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[#2563eb]">{pack.name}</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-3xl font-bold text-gray-950">{pack.price}</p>
                <p className="font-semibold text-gray-700">{pack.pages}</p>
              </div>
              <p className="mt-3 text-sm text-gray-600">{pack.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-950">Made for real everyday moments</h2>
          <p className="mt-2 max-w-2xl text-gray-600">
            Start with a classroom theme, a birthday idea, a favorite animal, or
            a quiet afternoon activity. PaziPagesAI turns it into a printable page.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {previewImages.map((image) => (
            <article key={image.src} className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-950">{image.label}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 py-14 lg:grid-cols-[360px_1fr]">
        <div>
          <h2 className="text-3xl font-bold text-gray-950">Popular coloring ideas</h2>
          <p className="mt-2 text-gray-600">
            Browse examples or use these categories as a starting point for your
            next custom prompt.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/gallery?category=${category}`}
              className="rounded-lg border bg-white p-4 text-center font-semibold text-gray-800 shadow-sm transition hover:border-[#2563eb] hover:text-[#2563eb]"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-lg border bg-[#172033] p-6 text-white sm:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Already bought a page pack?</h2>
            <p className="mt-2 text-gray-200">
              Recover your private studio link with the email used at checkout.
              No password reset, no account dashboard, just the link you need.
            </p>
          </div>
          <Link
            href="/generate/recover"
            className="inline-flex justify-center rounded-lg bg-white px-5 py-3 font-semibold text-[#172033] transition hover:bg-gray-100"
          >
            Recover Studio Link
          </Link>
        </div>
      </section>
    </div>
  );
}
