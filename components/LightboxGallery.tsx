"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

// Updated Photo type to include optional width and height for better image optimization
export type Photo = {
  id: string;
  alt: string;
  thumbSrc: string;
  fullSrc: string;
  width?: number;
  height?: number;
};

type Props = {
  photos: Photo[];
};

export default function LightboxGallery({ photos }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Effect for keyboard navigation (arrows, escape) and focus trapping
  useEffect(() => {
    const modalElement = modalRef.current;

    // Global keydown handler for navigation
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + photos.length) % photos.length
        );
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    // --- Focus Trap Logic ---
    if (openIndex !== null && modalElement) {
      const focusableElements = modalElement.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement?.focus();

      const handleModalKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          e.preventDefault();
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
            } else {
              const currentIndex = Array.from(focusableElements).indexOf(
                document.activeElement as HTMLElement
              );
              focusableElements[currentIndex - 1]?.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
            } else {
              const currentIndex = Array.from(focusableElements).indexOf(
                document.activeElement as HTMLElement
              );
              focusableElements[currentIndex + 1]?.focus();
            }
          }
        }
      };
      modalElement.addEventListener("keydown", handleModalKeyDown);

      // Cleanup modal-specific listener
      return () => {
        window.removeEventListener("keydown", handleGlobalKeyDown);
        modalElement.removeEventListener("keydown", handleModalKeyDown);
      };
    }

    // Cleanup global listener
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [openIndex, photos.length]);

  function close() {
    setOpenIndex(null);
  }
  function next() {
    setOpenIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
  }
  function prev() {
    setOpenIndex((i) =>
      i === null ? 0 : (i - 1 + photos.length) % photos.length
    );
  }

  const currentPhoto = openIndex !== null ? photos[openIndex] : null;
  const prevPhoto =
    openIndex !== null
      ? photos[(openIndex - 1 + photos.length) % photos.length]
      : null;
  const nextPhoto =
    openIndex !== null ? photos[(openIndex + 1) % photos.length] : null;

  return (
    <>
      {/* Grid using responsive aspect ratio containers and next/image */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((ph, idx) => (
          <figure
            key={ph.id}
            className="overflow-hidden rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 shadow-sm backdrop-blur"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(idx)}
              className="group block w-full"
              aria-label={`Nagyítás: ${ph.alt}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={ph.thumbSrc}
                  alt={ph.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </button>
            <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-400">
              {ph.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox Modal */}
      {openIndex !== null && currentPhoto && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Kép nagyítás"
          onClick={(e) => {
            if (e.currentTarget === e.target) close();
          }}
        >
          <div className="relative max-w-5xl w-full">
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute -top-10 -right-2 md:-right-8 rounded-full bg-white/80 text-gray-900 p-2 leading-none shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Bezárás (Esc)"
              title="Bezárás (Esc)"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <div className="relative mx-auto w-[min(92vw,1100px)] h-[min(80vh,1100px)]">
              <Image
                src={currentPhoto.fullSrc}
                alt={currentPhoto.alt}
                fill
                sizes="100vw"
                className="object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>

            {/* Navigation Buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 rounded-full bg-white/80 text-gray-900 p-3 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Előző (←)"
                  title="Előző (←)"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 rounded-full bg-white/80 text-gray-900 p-3 shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Következő (→)"
                  title="Következő (→)"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Caption */}
            <p className="mt-4 text-center text-sm text-white/80">
              {currentPhoto.alt}
            </p>
          </div>

          {/* Preload prev/next images, hidden from view */}
          <div style={{ display: "none" }}>
            {prevPhoto && (
              <Image
                src={prevPhoto.fullSrc}
                alt=""
                width={1600}
                height={1067}
                priority
              />
            )}
            {nextPhoto && (
              <Image
                src={nextPhoto.fullSrc}
                alt=""
                width={1600}
                height={1067}
                priority
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
