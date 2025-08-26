import Link from "next/link";
import NavLink from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded"
      >
        Ugrás a tartalomra
      </a>
      <div className="container">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="text-xl font-bold">
            Bernadetta • Webfejlesztés
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/bejegyzesek">Bejegyzések</NavLink>
            <NavLink href="/fotoalbum">Fotóalbum</NavLink>
            <NavLink href="/referenciak">Referenciák</NavLink>
            <NavLink href="/kapcsolat">Kapcsolat</NavLink>
          </nav>
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
