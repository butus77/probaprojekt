import React from "react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  tags?: string[];
};

export default function PostCard({ post }: { post: Post }) {
  const { slug, title, excerpt, date, tags = [] } = post;

  return (
    <article className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition">
      <h3 className="text-lg font-semibold">
        <a href={`/bejegyzesek/${slug}`} className="hover:underline">
          {title}
        </a>
      </h3>

      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{excerpt}</p>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        {date ? (
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("hu-HU")}
          </time>
        ) : null}
        {tags.length > 0 && <span>•</span>}
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
                #{t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
