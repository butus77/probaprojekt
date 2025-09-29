import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import Link from 'next/link';

// Generate params for all posts at build time
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const { meta } = await getPostBySlug(params.slug);
    return {
      title: `${meta.title} | Bernadetta – Webfejlesztés`,
      description: meta.excerpt,
    };
  } catch (error) {
    return {
      title: 'Bejegyzés nem található',
      description: 'A keresett bejegyzés nem létezik.',
    };
  }
}

// The main page component
export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    const { meta, html } = await getPostBySlug(params.slug);

    const formattedDate = new Date(meta.date).toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <section className="section">
        <header className="text-center max-w-3xl mx-auto">
          <p className="text-gray-500 dark:text-gray-400 mb-2">{formattedDate}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            {meta.title}
          </h1>
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article
          className="prose prose-lg prose-blue dark:prose-invert max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="text-center mt-12">
            <Link href="/bejegyzesek" className="btn-ghost">
                ← Vissza a bejegyzésekhez
            </Link>
        </div>
      </section>
    );
  } catch (error) {
    notFound();
  }
}