import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/70 dark:border-gray-800">
      <div className="container py-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bernadetta. Minden jog fenntartva.</p>
          <SocialLinks className="gap-2" variant="solid" />
        </div>
      </div>
   <div className="w-full max-w-md">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
    <a
      href="/cv/oneletrajz_bernadetta_hu.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border px-3 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900"
    >
      <span role="img" aria-label="Hungarian flag">🇭🇺</span> Önéletrajz
    </a>
    <a
      href="/cv/lebenslauf_bernadetta_de.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border px-3 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900"
    >
      <span role="img" aria-label="German flag">🇩🇪</span> Lebenslauf
    </a>
    <a
      href="/cv/cv_bernadetta_en.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border px-3 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900"
    >
      <span role="img" aria-label="UK flag">🇬🇧</span> CV
    </a>
  </div>
</div>



    </footer>
  );
}

