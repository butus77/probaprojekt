"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setDark(el.classList.contains("dark"));
  }

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Téma váltása"
      title="Téma váltása"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
