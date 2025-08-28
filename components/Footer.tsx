import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/70 dark:border-gray-800">
      <div className="container py-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bernadetta. Minden jog fenntartva.</p>
          <p>
            Készült Next.js 14 + Tailwind 3 segítségével.{" "}
            <Link
              href="/kapcsolat"
              className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Kapcsolat
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

