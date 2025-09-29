import { books } from '@/lib/books';
import BookCard from '@/components/BookCard';
import BackButton from '@/components/BackButton';
import MobileNotice from '@/components/MobileNotice';

export const metadata = {
  title: 'Könyvtár',
  description: 'Böngésszen a könyvtárunkban, ahol számos érdekes könyvet talál.',
};

export default function KonyvtarPage() {
  return (
    <section className="section">
      <div className='mb-6'><BackButton /></div>
      <div className="text-center max-w-3xl mx-auto">
        <h1>E-könyvtár</h1>
        <p className="mt-4 text-lg">
          Itt találhatók az általam készített digitális könyvek és segédanyagok, 
          amelyek hasznosak lehetnek a tanításban vagy a lelki elmélyülésben.
        </p>
      </div>

      <div className="mt-12">
        {books.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                cover={book.cover}
                excerpt={book.excerpt}
                link={book.link}
                year={book.year}
                tags={book.tags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">Jelenleg nincsenek könyvek a könyvtárban.</p>
          </div>
        )}
      </div>
    </section>
  );
}
