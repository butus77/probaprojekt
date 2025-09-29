import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define the structure of a post's metadata
export type PostMeta = {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags?: string[];
};

// Define the structure of a full post, including the slug and content
export type Post = {
  slug: string;
  meta: PostMeta;
  html: string;
};

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

/**
 * Returns a list of all post slugs (file names without .md).
 */
export function getPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    // If the directory doesn't exist, return an empty array
    console.warn('Could not read posts directory. Returning empty array.', error);
    return [];
  }
}

/**
 * Returns the content and metadata for a single post by its slug.
 */
export async function getPostBySlug(slug: string): Promise<Omit<Post, 'slug'>> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    meta: data as PostMeta,
    html: htmlContent,
  };
}

export type ListedPost = {
  slug: string;
  meta: PostMeta;
};
// lib/posts.ts – csak a getAllPosts() új verziója
export async function getAllPosts(): Promise<ListedPost[]> {
  const slugs = await getPostSlugs();
  const listed: ListedPost[] = [];

  for (const slug of slugs) {
    try {
      const { meta } = await getPostBySlug(slug);
      // minimális validáció: title + date legyen
      if (!meta.title || !meta.date) {
        console.warn(`[posts] Missing title/date in "${slug}.md" – skipping`);
        continue;
      }
      listed.push({ slug, meta });
    } catch (err) {
      console.error(`[posts] Failed to parse "${slug}.md" – skipping`, err);
    }
  }

  // dátum szerinti csökkenő rendezés
  listed.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
  return listed;
}

