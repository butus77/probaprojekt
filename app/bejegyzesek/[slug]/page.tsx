import { notFound } from "next/navigation";
import { posts } from "@/lib/data";

type PostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  return (
    <section className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {post.title}
      </h1>

      <p className="text-gray-500 dark:text-gray-400 mb-4">{formattedDate}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg text-gray-800 dark:text-gray-200">
        <p>{post.excerpt}</p>

        {/* Placeholder for full post content */}
        <p>
          Ez a bejegyzés teljes tartalma. Itt további részleteket találsz a{" "}
          <strong>{post.title}</strong> témában. Képzeld el, hogy ez egy hosszabb
          cikk, tele érdekes információkkal és gondolatokkal.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </section>
  );
}

