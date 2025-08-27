"use client";

import { useState } from "react";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen((v) => !v);
  }
  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
      {/* Skip link */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded"
      >
        Ugrás a tartalomra
      </a>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Fő sor */}
        <div className="flex items-center justify-between py-3">
          {/* Logó / cím */}
          <Link href="/" className="text-lg sm:text-xl font-bold" onClick={close}>
            Bernadetta • Webfejlesztés
          </Link>

          {/* Jobb oldal gombok */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            {/* Hamburger csak mobilon */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 md:hidden border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Menü megnyitása"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={toggle}
            >
              {/* egyszerű hamburger ikon */}
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Asztali menü */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/bejegyzesek">Bejegyzések</NavLink>
            <NavLink href="/fotoalbum">Fotóalbum</NavLink>
            <NavLink href="/referenciak">Referenciák</NavLink>
            <NavLink href="/kapcsolat">Kapcsolat</NavLink>
          </nav>
        </div>

        {/* Mobil menü – lenyíló panel */}
        {open && (
          <nav
            id="mobile-nav"
            className="md:hidden mt-2 mb-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur p-2 px-2 overflow-hidden"
          >
            <ul className="flex flex-col">
              <li className="p-1">
                <NavLink href="/" >Home</NavLink>
              </li>
              <li className="p-1">
                <NavLink href="/bejegyzesek">Bejegyzések</NavLink>
              </li>
              <li className="p-1">
                <NavLink href="/fotoalbum">Fotóalbum</NavLink>
              </li>
              <li className="p-1">
                <NavLink href="/referenciak">Referenciák</NavLink>
              </li>
              <li className="p-1">
                <NavLink href="/kapcsolat">Kapcsolat</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

