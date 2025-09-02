"use client";

import { useState } from "react";
import Link from "next/link";
import MobileNotice from "@/components/MobileNotice";

type RefItem = {
  id: string;
  title: string;
  year?: string | number;
  image?: string;
  excerpt?: string;
  tech?: string[];
  link?: string; // Megtekintés cél URL
  secondaryAction?: { href: string; label: string };
};

export default function ReferenceGrid({ items }: { items: RefItem[] }) {
  const [showNotice, setShowNotice] = useState(false);
  const [pendingLink, setPendingLink] = useState<string | null>(null);

  const handleViewClick = (href: string) => {
    // Desktopon mehet azonnal, mobilon figyelmeztessünk
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
      {/* Csak mobilon látható banner; desktopon nem zavar */}
      {showNotice && (
        <MobileNotice
          onContinue={handleContinue}
          onClose={() => {
            setShowNotice(false);
            setPendingLink(null);
          }}
        />
      )}

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 shadow-card backdrop-blur overflow-hidden flex flex-col"
          >
            {p.image && (
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}

            <div className="p-6 flex flex-col gap-3 flex-1">
              <header>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {p.title}{" "}
                  {p.year && (
                    <span className="ml-2 align-middle text-sm text-gray-500 dark:text-gray-400">
                      {p.year}
                    </span>
                  )}
                </h2>
              </header>

              {p.excerpt ? (
                <p className="text-gray-700 dark:text-gray-300">{p.excerpt}</p>
              ) : null}

              {p.tech?.length ? (
                <ul className="mt-1 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="text-xs font-medium rounded-full px-2.5 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-4 flex items-center gap-3">
                {p.link ? (
                  <button
                    type="button"
                    onClick={() => handleViewClick(p.link!)}
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold
                               bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Megtekintés
                  </button>
                ) : null}

                {p.secondaryAction ? (
                  <Link
                    href={p.secondaryAction.href}
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold
                               border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                  >
                    {p.secondaryAction.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
