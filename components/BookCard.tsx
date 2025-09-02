"use client";

import { useState } from "react";
import Link from "next/link";
import MobileNotice from "@/components/MobileNotice";

type Props = {
  id?: string; // ⬅ ÚJ prop, hogy a könyvhöz anchor legyen
  title: string;
  cover: string;
  excerpt?: string;
  link: string;
  year?: number;
  tags?: string[];
};

export default function BookCard({ id, title, cover, excerpt, link, year, tags }: Props) {
  const [showNotice, setShowNotice] = useState(false);
  const [pendingLink, setPendingLink] = useState<string | null>(null);

  const handleViewClick = (href: string) => {
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      setPendingLink(href);
      setShowNotice(true);
    }
  };

  const handleContinue = () => {
    if (pendingLink) {
      window.open(pendingLink, "_blank", "noopener,noreferrer");
    }
    setShowNotice(false);
    setPendingLink(null);
  };

  return (
    <>
      {showNotice && (
        <MobileNotice
          onContinue={handleContinue}
          onClose={() => {
            setShowNotice(false);
            setPendingLink(null);
          }}
        />
      )}
      <article
        id={id}
        className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 shadow-card backdrop-blur overflow-hidden flex flex-col"
      >
        {/* Borítókép */}
        <div className="aspect-[3/4] w-full overflow-hidden">
          <img
            src={cover}
            alt={`${title} – borító`}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Tartalom */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <header>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}{" "}
              {year && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {year}
                </span>
              )}
            </h2>
          </header>

          {excerpt && (
            <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{excerpt}</p>
          )}

          {/* Tag-ek */}
          {tags?.length ? (
            <ul className="mt-1 flex flex-wrap gap-2">
              {tags.map((t) => (
                <li
                  key={t}
                  className="text-xs font-medium rounded-full px-2.5 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}

          {/* Link */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => handleViewClick(link)}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold
                         bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Megtekintés
            </button>
          </div>
        </div>
      </article>
    </>
  );
}