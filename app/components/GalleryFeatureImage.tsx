"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type GalleryImage = {
  id: string;
  prompt: string;
  image_url: string;
};

type GalleryFeatureImageProps = {
  className?: string;
  label?: string;
};

export default function GalleryFeatureImage({
  className = "",
  label = "From the gallery",
}: GalleryFeatureImageProps) {
  const [image, setImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadGalleryImage() {
      try {
        const res = await fetch("/api/images?limit=12&offset=0");
        const data = await res.json();
        const images: GalleryImage[] = data.images || [];

        if (!isMounted || images.length === 0) return;

        const randomIndex = Math.floor(Math.random() * images.length);
        setImage(images[randomIndex]);
      } catch (err) {
        console.error("Unable to load gallery preview image:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadGalleryImage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Link
      href="/gallery"
      className={`group block overflow-hidden rounded-lg border bg-[#fffdf8] shadow-inner transition hover:border-[#2563eb] ${className}`}
      aria-label="View gallery examples"
    >
      <div className="relative aspect-[4/5] bg-white">
        {image && (
          <Image
            src={image.image_url}
            alt={image.prompt || "Gallery coloring page example"}
            fill
            sizes="(min-width: 1024px) 420px, 90vw"
            className="object-contain p-5 transition duration-300 group-hover:scale-[1.02]"
            unoptimized
            priority
          />
        )}

        {!image && (
          <div className="flex h-full items-center justify-center p-8 text-center text-sm text-gray-500">
            {isLoading ? "Loading gallery preview..." : "Gallery preview unavailable"}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t bg-white px-4 py-3 text-sm">
        <span className="font-semibold text-gray-900">{label}</span>
        <span className="font-medium text-[#2563eb] transition group-hover:underline">
          View gallery
        </span>
      </div>
    </Link>
  );
}