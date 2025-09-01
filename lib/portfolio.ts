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
    type: 'project',
    excerpt: "Frontend fejlesztőként közreműködtem a VR Világ Szeged weboldal látványrétegének felépítésében. A reszponzív dizájn, a felhasználói felület komponensei és a modern megjelenés kialakítása volt a fő fókuszom.",
    link: "https://www.vrvilagszeged.hu",
    tech: ["Next.js", "TailwindCSS", "React"],
    year: 2025,
    image: "/Screenshot from VRvilag.png",
  },
];

// --- Curated list of books to show in portfolio ---
const curatedBookIds: string[] = ['elsoaldozasra'];

const bookReferences: Reference[] = books
  .filter(book => curatedBookIds.includes(book.id))
  .map(book => ({
    ...book,
    id: book.id,
    image: book.cover,
    type: 'book',
    tags: book.tags || ['ebook'],
    secondaryAction: { label: 'Teljes könyvtár', href: '/konyvtar' },
  }));

// --- Combined list for export ---
export const references: Reference[] = [...projectReferences, ...bookReferences];
