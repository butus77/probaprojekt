import { MetadataRoute } from 'next';
import { siteInfo } from '@/lib/site';
import { getPostSlugs } from '@/lib/posts';
import { books } from '@/lib/books';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteInfo.url || 'https://probaprojekt.vercel.app';

  const staticRoutes = [
    '/',
    '/bejegyzesek',
    '/fotoalbum',
    '/referenciak',
    '/konyvtar',
    '/kapcsolat',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const postSlugs = getPostSlugs();
  const postRoutes = postSlugs.map((slug) => ({
    url: `${baseUrl}/bejegyzesek/${slug}`,
    lastModified: new Date(),
  }));

  const bookRoutes = books.map((book) => ({
    url: `${baseUrl}/konyvtar#${book.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...bookRoutes];
}
