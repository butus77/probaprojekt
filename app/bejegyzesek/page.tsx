import PostCard from "@/components/PostCard";
import { posts } from "@/lib/data";

export const metadata = { title: "Bejegyzések | Bernadetta – Webfejlesztés" };

export default function PostsPage() {
  return (
    <section className="section">
      <h1>Bejegyzések</h1>
      <p className="mt-2">Rövid, érthető írások a weboldal-készítésről.</p>
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        {posts.map((p) => (
          <div key={p.slug} className="card p-6">
            <PostCard post={p as any} />
          </div>
        ))}
      </div>
    </section>
  );
}

