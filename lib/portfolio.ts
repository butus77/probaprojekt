export type Reference = {
  id: string;
  title: string;
  excerpt: string;
  link?: string;
  tech?: string[];
  year?: number;
  image?: string; // Path to project image, e.g., '/images/project-thumbnail.jpg'
};

export const references: Reference[] = [
  
  // Ide illeszd be a valós portfólió adataidat
  // Példa 1:
  // {
  //   id: 'my-awesome-project',
  //   title: 'Szuper Webalkalmazás',
  //   excerpt: 'Egy komplex webalkalmazás, amely segít a felhasználóknak a feladataik kezelésében.',
  //   link: 'https://www.example.com/my-awesome-project',
  //   tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  //   year: 2025,
  //   image: '/photos/project-awesome.jpg',
  // },
  //
  // Példa 2:
  // {
  //   id: 'another-cool-site',
  //   title: 'Modern Weboldal',
  //   excerpt: 'Egy letisztult és modern bemutatkozó weboldal egy kreatív ügynökség számára.',
  //   link: 'https://www.example.com/another-cool-site',
  //   tech: ['HTML5', 'CSS3', 'JavaScript'],
  //   year: 2025,
  //   image: '/photos/project-another.jpg',
  // },
{
  id: "vr-vilag-szeged",
  title: "VR Világ Szeged Weboldal",
  excerpt:"Frontend fejlesztőként közreműködtem a VR Világ Szeged weboldal látványrétegének felépítésében. A reszponzív dizájn, a felhasználói felület komponensei és a modern megjelenés kialakítása volt a fő fókuszom.",
  link: "https://www.vrvilagszeged.hu", // ha publikus, maradhat
  tech: ["Next.js", "TailwindCSS", "React"],
  year: 2025,
  image: "/photos/Screenshot from VRvilag.png", // ide tehetsz egy screenshotot a public/photos mappába
},



];