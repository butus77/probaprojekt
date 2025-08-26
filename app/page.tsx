import Link from "next/link";

export const metadata = { title: "Bemutatkozó | Bernadetta – Webfejlesztés" };

export default function HomePage() {
  return (
    <section className="section">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h1>
            Szia, Bernadetta vagyok. <br />
            <span className="text-blue-600">Weblapépítéssel foglalkozom.</span>
          </h1>
          <p className="mt-4">
            Modern, letisztult és gyors weboldalakat készítek, amelyek minden eszközön kiválóan működnek.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/bejegyzesek" className="btn-primary">Bejegyzések</Link>
            <Link href="/fotoalbum" className="btn-ghost">Fotóalbum</Link>
          </div>
        </div>

        <aside className="card p-6">
          <h2>Filozófiám</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <div>
                <h3 className="font-semibold">Reszponzív tervezés</h3>
                <p className="text-sm">Mobilon és asztalin is kiváló élmény.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <div>
                <h3 className="font-semibold">Egyszerű szerkezet</h3>
                <p className="text-sm">Átlátható, bővíthető komponensek.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span aria-hidden className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <div>
                <h3 className="font-semibold">Gyors betöltés</h3>
                <p className="text-sm">Optimált kód és képek.</p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
