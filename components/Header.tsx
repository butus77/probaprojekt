import Link from "next/link";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <a href="#content" className="sr-only focus:not-sr-only">
        Ugrás a tartalomra
      </a>
      <div className="text-2xl font-bold">
        <Link href="/">Bernadetta • Webfejlesztés</Link>
      </div>
      <nav className="flex gap-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/bejegyzesek">Bejegyzések</NavLink>
        <NavLink href="/fotoalbum">Fotóalbum</NavLink>
        <NavLink href="/referenciak">Referenciák</NavLink>
        <NavLink href="/kapcsolat">Kapcsolat</NavLink>
      </nav>
    </header>
  );
}