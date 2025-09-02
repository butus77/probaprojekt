import Link from "next/link";

export const metadata = { title: "Bemutatkozó | Bernadetta – Webfejlesztés" };

export default function HomePage() {
  const buttonClass =
  "text-center inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition " +
  "border border-blue-200 bg-blue-50 text-blue-700 " +
  "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 " +
  "hover:bg-blue-700 hover:text-white dark:hover:border-blue-700 " +
  "hover:shadow-md hover:-translate-y-0.5 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";


  return (
    <section className="section py-12 md:py-20">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 text-center">
          <h1 className="text-gray-800 dark:text-blue-400 md:py-10 text-3xl  font-bold leading-[1.2] md:leading-[1.15] sm:text-4xl md:text-5xl space-y-2 md:space-y-4">
            <span className="block bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
             bg-clip-text text-transparent">Szia, Bernadetta vagyok.</span>
            <span className="block mt-1 md:mt-1.5  text-blue-600">
              Weblapépítéssel foglalkozom.
            </span>
          </h1>

          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Modern, letisztult és gyors weboldalakat készítek, amelyek minden
            eszközön kiválóan működnek.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/bejegyzesek" className={buttonClass}>
              Bejegyzések
            </Link>
            <Link href="/fotoalbum" className={buttonClass}>
              Fotóalbum
            </Link>
            <Link href="/referenciak" className={buttonClass}>
              Referenciák
            </Link>
            <Link href="/kapcsolat" className={buttonClass}>
              Kapcsolat
            </Link>
          </div>
        </div>

        <aside className="card p-6 bg-white/90 border border-blue-100 shadow-sm">
          <h2 className="text-blue-700 dark:text-blue-500">Filozófiám</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500/90"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-blue-400">
                  Reszponzív tervezés
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  Mobilon és asztali számítógépen is kiváló élmény.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-blue-400">
                  Egyszerű szerkezet
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Átlátható, bővíthető komponensek.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-blue-400">
                  Gyors betöltés
                </h3>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Optimalizált kód és képek.
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
