"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "preferred-theme"; // "dark" | "light"

function systemPrefersDark() {
  return typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("light");

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem(STORAGE_KEY) as "dark" | "light" | null);
    const initial = saved ?? (systemPrefersDark() ? "dark" : "light");
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMode(initial);
  }, []);

  function toggle() {
    const next: "dark" | "light" = mode === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(STORAGE_KEY, next);
    setMode(next);
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
      {mode === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
