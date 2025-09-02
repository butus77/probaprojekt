"use client";

import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type NavLink = { href: string; label: string };
type Props = {
  links: NavLink[];
  className?: string;
};

export default function HamburgerMenu({ links, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // ESC zárás + body scroll lock
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
        aria-expanded={open}
        aria-controls={menuId}
        className={
          "inline-flex items-center justify-center rounded-xl p-2 " +
          "text-gray-700 hover:bg-gray-100 focus-visible:outline-none " +
          "focus-visible:ring-2 focus-visible:ring-blue-500 " +
          "dark:text-gray-200 dark:hover:bg-gray-800 " +
          className
        }
      >
        <AnimatedBurger isOpen={open} />
      </button>

      {/* Overlay + Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Sötét háttér */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Legördülő panel */}
            <motion.nav
              id={menuId}
              className="fixed left-0 right-0 top-0 z-50 mx-auto max-w-screen-md 
                         rounded-b-2xl bg-white/95 dark:bg-gray-900/95 
                         backdrop-blur border-b border-gray-200/70 dark:border-gray-800"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <ul className="px-4 py-4 divide-y divide-gray-200/70 dark:divide-gray-800">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block px-2 py-3 text-lg font-medium 
                                 text-gray-900 hover:text-blue-700 
                                 dark:text-gray-100 dark:hover:text-blue-400"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function AnimatedBurger({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      aria-hidden="true"
      initial={false}
    >
      <motion.line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={isOpen ? { x1: 5, y1: 5, x2: 19, y2: 19 } : { x1: 4, y1: 6, x2: 20, y2: 6 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={isOpen ? { x1: 5, y1: 19, x2: 19, y2: 5 } : { x1: 4, y1: 18, x2: 20, y2: 18 }}
        transition={{ duration: 0.2 }}
      />
    </motion.svg>
  );
}
