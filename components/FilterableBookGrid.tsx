"use client";

import { useState, useMemo } from 'react';
import BookCard from './BookCard';
import type { Reference } from '@/lib/portfolio';

type Props = {
  books: Reference[];
};

export default function FilterableBookGrid({ books }: Props) {
  const [query, setQuery] = useState('');

  const filteredBooks = useMemo(() => {
    if (!query) return books;
    const lowerCaseQuery = query.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.excerpt?.toLowerCase().includes(lowerCaseQuery)
    );
  }, [books, query]);

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Keresés cím vagy leírás alapján..."
          className="w-full max-w-sm rounded-xl border bg-white/90 dark:bg-gray-900/60 p-3 outline-none transition placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
          aria-label="Könyvek szűrése"
        />
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              cover={book.image || ''}
              excerpt={book.excerpt}
              link={book.link ?? undefined}
              year={book.year}
              tags={book.tags}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">Nincs a keresésnek megfelelő találat.</p>
        </div>
      )}
    </div>
  );
}
