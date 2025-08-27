import Link from "next/link";

const references = [
  {
    id: 1,
    title: "Vállalati Weboldal",
    excerpt: "Egy modern és reszponzív weboldal egy helyi vállalkozás számára, amely bemutatja szolgáltatásaikat és portfóliójukat.",
    link: "https://example.com/project1",
  },
  
  {
    id: 2,
    title: "E-kereskedelmi Platform",
    excerpt: "Egy teljes körű e-kereskedelmi megoldás, termékkatalógussal, kosárfunkcióval és biztonságos fizetési átjáróval.",
    link: "https://example.com/project2",
  },
  {
    id: 3,
    title: "Személyes Blog",
    excerpt: "Egy egyedi tervezésű blog platform, ahol a felhasználó megoszthatja gondolatait és tapasztalatait a világgal.",
    link: "https://example.com/project3",
  },
  {
    id: 4,
    title: "Mobil Alkalmazás Landing Page",
    excerpt: "Egy vonzó landing page egy új mobilalkalmazás bemutatására, letöltési linkekkel és funkciók kiemelésével.",
    link: "https://example.com/project4",
  },
];

export default function ReferenciakPage() {
  return (
    <section className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Referenciák</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto">
        Íme néhány projekt, amelyeken az elmúlt időszakban dolgoztam. Ezek a munkák jól tükrözik a webfejlesztési képességeimet és a modern technológiák iránti elkötelezettségemet.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {references.map((project) => (
          <div key={project.id} className="card bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{project.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{project.excerpt}</p>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors self-start"
            >
              Megtekintés
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}