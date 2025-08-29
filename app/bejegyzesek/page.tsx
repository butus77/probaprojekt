import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata = { title: "Bejegyzések | Bernadetta – Webfejlesztés" };

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <section className="section">
      <h1>Bejegyzések</h1>
      <p className="mt-2">Rövid gondolatsorok a weboldal-készítésről és rólam.</p>
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="card p-6 flex flex-col">
            <h2 className="text-xl font-semibold">{post.meta.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {new Date(post.meta.date).toLocaleDateString('hu-HU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="mt-4 flex-grow text-gray-700 dark:text-gray-300">{post.meta.excerpt}</p>
            <div className="mt-4">
                <Link href={`/bejegyzesek/${post.slug}`} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                Tovább →
                </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}