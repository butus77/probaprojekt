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
    </footer>
  );
}

