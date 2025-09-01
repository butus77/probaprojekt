"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Book, Tag } from 'lucide-react';

type Props = {
  title: string;
  cover: string;
  excerpt?: string;
  link?: string;
  year?: number;
  tags?: string[];
};

export default function BookCard({ title, cover, excerpt, link, year, tags }: Props) {
  return (
    <article className="card flex flex-col overflow-hidden h-full p-4">
      <div className="relative w-full aspect-[2/3] bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-bold leading-tight flex-grow">{title}</h2>
        
        {(year || (tags && tags.length > 0)) && (
          <div className="mt-2 flex items-center gap-x-3 text-xs text-gray-500 dark:text-gray-400">
            {year && (
              <span className="flex items-center gap-1">
                <Book size={14} /> {year}
              </span>
            )}
            {tags && tags.length > 0 && (
              <span className="flex items-center gap-1 truncate">
                <Tag size={14} /> {tags.join(', ')}
              </span>
            )}
          </div>
        )}

        {excerpt && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {excerpt}
          </p>
        )}

        {link && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Link href={link} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center">
              Megtekintés
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
