import Link from "next/link";
import { references } from "@/lib/portfolio";

export const metadata = { title: "Referenciák | Bernadetta – Webfejlesztés" };

export default function ReferenciakPage() {
  return (
    <section className="section">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 text-center">
        Referenciák
      </h1>

      <p className="mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
        Referenciáim egyszerre mutatják meg a webfejlesztésben szerzett tapasztalataimat és az e-book formájában szerkesztett hitoktatói munkáimat – két terület, amelyben közös a kreatív, értékteremtő szemlélet. </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {references.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-gray-200/70 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 shadow-card backdrop-blur overflow-hidden flex flex-col"
          >
            {/* Kép – csak ha van */}
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

              <p className="text-gray-700 dark:text-gray-300">{p.excerpt}</p>

              {/* Tech badge-ek, ha vannak */}
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

              {/* Gombok */}
              <div className="mt-4 flex items-center gap-3">
                {p.link ? (
                    <Link
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold
                                 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Megtekintés
                    </Link>
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
    </section>
  );
}
