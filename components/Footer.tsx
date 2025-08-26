export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/70 dark:border-gray-800">
      <div className="container py-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bernadetta. Minden jog fenntartva.</p>
          <p>
            Készült Next.js 14 + Tailwind 3 segítségével.{" "}
            <a className="underline" href="mailto:info@bernadetta.hu">
              info@bernadetta.hu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

