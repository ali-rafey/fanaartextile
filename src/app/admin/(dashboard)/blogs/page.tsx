import Image from "next/image";
import Link from "next/link";
import { listAllPosts, type BlogRow } from "@/lib/db/blogs";
import { removePost, seedPosts } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  let posts: BlogRow[] = [];
  let error: string | null = null;

  try {
    posts = await listAllPosts();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load posts.";
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Journal</h1>
          <p className="mt-1.5 text-sm text-neutral-500">
            Articles on /blogs and the homepage strip.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
        >
          New post
        </Link>
      </div>

      {error ? (
        <div className="mt-8 rounded-3xl bg-amber-50 p-6 text-sm text-amber-900">
          <p className="font-semibold">Could not load posts.</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2">
            Run the v2 section of{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/schema.sql</code> in
            the Supabase SQL editor.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-neutral-50 p-12 text-center">
          <p className="text-sm text-neutral-500">
            No posts yet — the site is showing its built-in starter articles.
          </p>
          <form action={seedPosts} className="mt-5">
            <button className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
              Import starter articles
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="group">
              <Link
                href={`/admin/blogs/${post.id}`}
                prefetch
                className="block overflow-hidden rounded-3xl bg-neutral-100"
              >
                <div className="relative aspect-[4/3]">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.alt || post.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}

                  {!post.published && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-neutral-700 shadow-sm">
                      Draft
                    </span>
                  )}

                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-black/55 to-transparent p-4 text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Edit post
                  </span>
                </div>
              </Link>

              <div className="mt-3 px-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="line-clamp-2 text-sm font-bold text-neutral-900">{post.title}</p>
                  <form action={removePost.bind(null, post.id)}>
                    <button
                      aria-label={`Delete ${post.title}`}
                      className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </form>
                </div>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {[post.category, post.published_on].filter(Boolean).join(" · ") || "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
