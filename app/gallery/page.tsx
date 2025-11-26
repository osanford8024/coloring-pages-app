"use client";

import { useEffect, useMemo, useState } from "react";
import AdUnit from "../components/AdUnit";

const LIMIT = 12;

type ImageRow = {
  id: string;
  prompt: string;
  image_url: string;
  category?: string | null;
  created_at?: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<ImageRow[]>([]);
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number>(0);

  const categories = [
    "Animals",
    "People",
    "Fantasy",
    "Sports",
    "Cars",
    "Food",
    "Dinosaurs",
    "Space",
    "Flowers",
  ];

  async function loadImages(
    reset = false,
    categoryOverride: string | null = null
  ) {
    setIsLoading(true);

    const category = categoryOverride ?? activeCategory;
    const offset = reset ? 0 : page * LIMIT;
    let url = `/api/images?limit=${LIMIT}&offset=${offset}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const newImages: ImageRow[] = data.images || [];

      if (reset) {
        setImages(newImages);
        setPage(1);
      } else {
        setImages((prev) => {
          const merged = [...prev, ...newImages];
          return Array.from(new Map(merged.map((img) => [img.id, img])).values());
        });
        setPage((prev) => prev + 1);
      }

      setHasMore(newImages.length === LIMIT);
    } catch (err) {
      console.error("Failed to load images:", err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadImages(true, null);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !isLoading &&
        hasMore
      ) {
        loadImages();
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoading, hasMore, page, activeCategory]);

  function selectCategory(category: string | null) {
    setActiveCategory(category);
    setPage(0);
    loadImages(true, category);
  }

  const currentImage = useMemo(
    () => images[modalIndex],
    [images, modalIndex]
  );

  function openModal(index: number) {
    setModalIndex(index);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function nextImage() {
    setModalIndex((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function downloadCurrent() {
    if (!currentImage) return;
    const link = document.createElement("a");
    link.href = currentImage.image_url;
    link.download = `coloring-page-${currentImage.id}.png`;
    link.click();
  }

  function printCurrent() {
    if (!currentImage) return;

    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>Print Coloring Page</title>
          <style>
            @page { margin: 0; size: auto; }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            img {
              max-height: 95vh;
              width: auto;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${currentImage.image_url}" />
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);

    win.document.close();
  }

  return (
    <div className="px-4 md:px-6 lg:px-10 py-6">
      <h1 className="text-3xl font-bold mb-4">Gallery</h1>

      {/* INTRO CONTENT (AdSense Optimization) */}
      <p className="text-gray-600 mb-6 max-w-2xl">
        Explore thousands of AI-generated, kid-friendly coloring pages created by the
        PaziPagesAI community. Browse by category or scroll endlessly to discover new
        creative designs—perfect for printing, classrooms, and fun family activities.
      </p>

      {/* CATEGORY FILTER BUTTONS — BRAND BLUE */}
      <div className="flex flex-wrap gap-3 mb-6">

        {/* ALL BUTTON */}
        <button
          onClick={() => selectCategory(null)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition
            ${
              activeCategory === null
                ? "bg-[#2563eb] text-white border-[#2563eb]"
                : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
            }
          `}
        >
          All
        </button>

        {/* CATEGORY LOOP */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition
              ${
                activeCategory === cat
                  ? "bg-[#2563eb] text-white border-[#2563eb]"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="my-6 flex justify-center">
        <AdUnit slot="1410253778" />
      </div>

      {images.length === 0 && !isLoading && (
        <p className="text-center text-gray-500">No images found.</p>
      )}

      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div key={img.id} className="contents">
            <button
              onClick={() => openModal(idx)}
              className="w-full border rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={img.image_url}
                alt={img.prompt}
                className="w-full object-contain aspect-square"
              />
            </button>

            {idx === 11 && (
              <div className="col-span-full my-8 flex justify-center">
                <AdUnit slot="3533127881" />
              </div>
            )}
          </div>
        ))}
      </div>

      {isLoading && (
        <p className="text-center text-gray-500 mt-6">Loading...</p>
      )}

      {/* MODAL */}
      {isModalOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full px-3 py-1 hover:bg-gray-300"
            >
              Close ✕
            </button>

            <div className="flex justify-center">
              <img
                src={currentImage.image_url}
                alt={currentImage.prompt}
                className="max-h-[70vh] w-auto rounded-md"
              />
            </div>

            <p className="text-center text-gray-800 mt-3">
              {currentImage.prompt}
            </p>

            {/* MODAL ACTION BUTTONS — BRAND COLORS */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">

              <button
                onClick={prevImage}
                className="px-4 py-2 rounded-lg bg-blue-100 text-[#2563eb] hover:bg-blue-200 transition"
              >
                ◀ Prev
              </button>

              <button
                onClick={downloadCurrent}
                className="px-4 py-2 rounded-lg bg-[#16a34a] text-white hover:bg-[#12863e] transition"
              >
                Download PNG
              </button>

              <button
                onClick={printCurrent}
                className="px-4 py-2 rounded-lg bg-white border border-[#2563eb] text-[#2563eb] hover:bg-blue-50 transition"
              >
                Print / PDF
              </button>

              <button
                onClick={nextImage}
                className="px-4 py-2 rounded-lg bg-blue-100 text-[#2563eb] hover:bg-blue-200 transition"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="my-10 flex justify-center">
        <AdUnit slot="9631632376" />
      </div>
    </div>
  );
}
