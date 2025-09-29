import { books, type Book } from '@/lib/books';

export type Reference = {
  id: string;
  title: string;
  year?: number;
  excerpt?: string;
  image?: string;
  link?: string;
  tech?: string[];
  tags?: string[];
  type?: 'project' | 'book';
  secondaryAction?: { label: string; href: string };
};

// --- Static list of projects ---
const projectReferences: Reference[] = [
  {
    id: "vr-vilag-szeged",
    title: "VR Világ Szeged Weboldal",
    type: "project",
    excerpt:
      "Frontend fejlesztőként közreműködtem a VR Világ Szeged weboldal látványrétegének felépítésében. A reszponzív dizájn, a felhasználói felület komponensei és a modern megjelenés kialakítása volt a fő fókuszom.",
    link: "https://www.vrvilagszeged.hu",
    tech: ["Next.js", "TailwindCSS", "React"],
    year: 2025,
    image: "/Screenshot from VRvilag.png",
  },

  // 🔹 ÚJ: Acme – többnyelvű sablon (projekt referencia)
  {
    id: "acme-multilingual-template",
    title: "Acme – Többnyelvű weboldal sablon",
    type: "project",
    excerpt:
      "Next.js 15 + Tailwind v4 alapú sablon next-intl i18n-nel (hu/sr/de/en), shadcn/ui komponensekkel és SEO-barát struktúrával. Oktatási célra és ügyfélprojektek indításához egyaránt.",
    // Ha van élő demó URL-ed, ide tedd. Ha nincs, maradhat a GitHub repo:
    link: "https://acme-site-five.vercel.app/hu",
    tech: ["Next.js 15", "Tailwind CSS v4", "next-intl", "TypeScript", "shadcn/ui"],
    tags: ["többnyelvű", "sablon", "i18n"],
    year: 2025,
    image: "/Screenshot from Acme-site.png",
    secondaryAction: {
      label: "Nézd meg a repo-t",
      href: "https://github.com/butus77/acme-site",
    },
  },
];

// --- Curated list of books to show in portfolio ---
const curatedBookIds: string[] = ["elsoaldozasra"];

const bookReferences: Reference[] = books
  .filter((book) => curatedBookIds.includes(book.id))
  .map((book) => ({
    ...book,
    id: book.id,
    image: book.cover,
    type: "book",
    tags: book.tags || ["ebook"],
    secondaryAction: { label: "Teljes könyvtár", href: "/konyvtar" },
  }));

// --- Combined list for export ---
export const references: Reference[] = [...projectReferences, ...bookReferences];

