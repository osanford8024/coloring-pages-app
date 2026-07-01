"use client";

import { useEffect, useMemo, useState } from "react";

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

  return (
    <div className="px-4 md:px-6 lg:px-10 py-6">
      <h1 className="text-3xl font-bold mb-4">Gallery</h1>

      <p className="text-gray-600 mb-6 max-w-2xl">
        Browse examples of AI-generated, kid-friendly coloring pages created by
        the PaziPagesAI community. Use the gallery for inspiration, then create
        your own custom printable page when you are ready.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
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

      {images.length === 0 && !isLoading && (
        <p className="text-center text-gray-500">No images found.</p>
      )}

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
          </div>
        ))}
      </div>

      {isLoading && (
        <p className="text-center text-gray-500 mt-6">Loading...</p>
      )}

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
              Close
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

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={prevImage}
                className="px-4 py-2 rounded-lg bg-blue-100 text-[#2563eb] hover:bg-blue-200 transition"
              >
                Prev
              </button>

              <a
                href="/generate"
                className="px-4 py-2 rounded-lg bg-[#2563eb] text-white hover:bg-[#1e4fc2] transition"
              >
                Create Your Own
              </a>

              <button
                onClick={nextImage}
                className="px-4 py-2 rounded-lg bg-blue-100 text-[#2563eb] hover:bg-blue-200 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
