"use client";

import { useEffect, useState } from "react";

export type Photo = { id: string; alt: string; thumbSrc: string; fullSrc: string }; // Updated type

type Props = {
  photos: Photo[];
  thumbHeightClass?: string; // pl. "h-56" (alapértelmezett)
};

export default function LightboxGallery({ photos, thumbHeightClass = "h-56" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // billentyűkezelés: ESC/←/→
  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, photos.length]);

  function close() {
    setOpenIndex(null);
  }
  function next() {
    setOpenIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
  }
  function prev() {
    setOpenIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
  }

  return (
    <>
      {/* Rács – bélyegképek */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((ph, idx) => (
          <figure
            key={ph.id}
            className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(idx)}
              className="group block w-full"
              aria-label={`Nagyítás: ${ph.alt}`}
            >
              <img
                src={ph.thumbSrc} // Use thumbSrc for thumbnails
                alt={ph.alt}
                className={`w-full ${thumbHeightClass} object-cover transition-transform duration-300 group-hover:scale-105`}
                loading="lazy"
              />
            </button>
            <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-400">
              {ph.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox overlay */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Kép nagyítás"
          onClick={(e) => {
            // csak háttér-kattintásra zárjon
            if (e.currentTarget === e.target) close();
          }}
        >
          <div className="relative max-w-5xl w-full">
            {/* Bezárás */}
            <button
              onClick={close}
              className="absolute -top-2 -right-2 rounded-full bg-white/90 text-gray-900 px-3 py-1 text-sm shadow hover:bg-white"
              aria-label="Bezárás (Esc)"
              title="Bezárás (Esc)"
            >
              ✕
            </button>

            {/* Kép */}
            <div className="flex items-center justify-center">
              <img
                src={photos[openIndex].fullSrc} // Changed from photos[openIndex].src to photos[openIndex].fullSrc
                alt={photos[openIndex].alt}
                className="max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow"
              />
            </div>

            {/* Navigációs gombok */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-gray-900 px-3 py-2 shadow hover:bg-white"
                  aria-label="Előző (←)"
                  title="Előző (←)"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-gray-900 px-3 py-2 shadow hover:bg-white"
                  aria-label="Következő (→)"
                  title="Következő (→)"
                >
                  →
                </button>
              </>
            )}

            {/* Felirat */}
            <p className="mt-3 text-center text-sm text-white/80">
              {photos[openIndex].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}