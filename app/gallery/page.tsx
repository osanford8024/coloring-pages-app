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

  // Modal state
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

  /**
   * -------------------------------
   * LOAD IMAGES FROM API
   * -------------------------------
   */
  async function loadImages(
    reset = false,
    categoryOverride: string | null = null
  ) {
    setIsLoading(true);

    const categoryToUse = categoryOverride ?? activeCategory;

    const offset = reset ? 0 : page * LIMIT;
    let url = `/api/images?limit=${LIMIT}&offset=${offset}`;

    if (categoryToUse) {
      url += `&category=${encodeURIComponent(categoryToUse)}`;
    }

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
          // de-dupe by id
          return Array.from(
            new Map(merged.map((img) => [img.id, img])).values()
          );
        });
        setPage((prev) => prev + 1);
      }

      setHasMore(newImages.length === LIMIT);
    } catch (error) {
      console.error("Failed to load images:", error);
    }

    setIsLoading(false);
  }

  /**
   * ----------------------------------
   * LOAD INITIAL IMAGES
   * ----------------------------------
   */
  useEffect(() => {
    loadImages(true, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ----------------------------------
   * HANDLE CATEGORY CHANGE
   * ----------------------------------
   */
  function selectCategory(category: string | null) {
    setActiveCategory(category);
    setPage(0);
    loadImages(true, category);
  }

  /**
   * ----------------------------------
   * INFINITE SCROLL
   * ----------------------------------
   */
  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !isLoading &&
        hasMore
      ) {
        loadImages();
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasMore, page, activeCategory]);

  /**
   * ----------------------------------
   * MODAL HELPERS
   * ----------------------------------
   */
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

  function prevImage() {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function nextImage() {
    setModalIndex((prev) => (prev + 1) % images.length);
  }

  // ESC closes modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, images.length]);

  /**
   * ----------------------------------
   * DOWNLOAD / PRINT
   * ----------------------------------
   */
  function downloadCurrent() {
    if (!currentImage) return;
    const link = document.createElement("a");
    link.href = currentImage.image_url;
    link.download = `coloring-page-${currentImage.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function printCurrent() {
    if (!currentImage) return;
    const w = window.open("", "_blank");
    if (!w) return;

    w.document.write(`
      <html>
        <head>
          <title>Print Coloring Page</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; }
            img { width: 100%; max-width: 900px; height: auto; }
            @media print {
              body { margin: 0; }
              img { width: 100%; height: auto; }
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
    w.document.close();
  }

  return (
    <div className="px-4 md:px-6 lg:px-10 py-6">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>

      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => selectCategory(null)}
          className={`px-4 py-2 whitespace-nowrap rounded-full border text-sm font-medium transition ${
            activeCategory === null
              ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
              : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`px-4 py-2 whitespace-nowrap rounded-full border text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                : "bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* IMAGE GRID */}
      {images.length === 0 && !isLoading ? (
        <p className="text-center text-gray-500">
          No images found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => openModal(idx)}
              className="w-full border rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition"
              aria-label={`Open image ${img.prompt}`}
            >
              <img
  src={img.image_url}
  alt={img.prompt}
  className="w-full object-contain aspect-square"
/>

            </button>
          ))}
        </div>
      )}

      {/* LOADING INDICATOR */}
      {isLoading && (
        <p className="text-center text-gray-500 my-4">Loading...</p>
      )}

      {/* MODAL */}
      {isModalOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3"
          onClick={closeModal}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl p-3 md:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm hover:opacity-80"
            >
              Close ✕
            </button>

            {/* Image */}
            <div className="flex items-center justify-center">
              <img
                src={currentImage.image_url}
                alt={currentImage.prompt}
                className="max-h-[70vh] w-auto rounded-md"
              />
            </div>

            {/* Prompt / Category */}
            <div className="mt-3 text-center">
              <p className="text-sm md:text-base text-gray-800 dark:text-gray-100">
                {currentImage.prompt}
              </p>
              {currentImage.category && (
                <p className="text-xs text-gray-500 mt-1">
                  Category: {currentImage.category}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={prevImage}
                className="px-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 transition"
              >
                ◀ Prev
              </button>

              <button
                onClick={downloadCurrent}
                className="px-4 py-2 rounded-lg border bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
              >
                Download PNG
              </button>

              <button
                onClick={printCurrent}
                className="px-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 transition"
              >
                Print / Save PDF
              </button>

              <button
                onClick={nextImage}
                className="px-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 transition"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
