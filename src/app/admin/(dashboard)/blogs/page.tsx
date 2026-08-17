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
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Journal</h1>
          <p className="mt-1 text-sm text-stone-500">
            Posts shown on /blogs and the homepage journal strip.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-clay-deep"
        >
          New post
        </Link>
      </div>

      {error ? (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <p className="font-medium">Could not load posts.</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-amber-700">
            Run the v2 section of{" "}
            <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code> in the
            Supabase SQL editor to create the tables.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
          <p className="text-sm text-stone-500">
            No posts in the database yet — the site is showing its built-in starter
            articles.
          </p>
          <form action={seedPosts} className="mt-5">
            <button className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay">
              Import starter articles
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/blogs/${post.id}`}
                      className="font-medium text-ink hover:text-clay"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-stone-400">/{post.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-stone-600">{post.category || "—"}</td>
                  <td className="px-5 py-3 text-stone-600">{post.published_on || "—"}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <form action={removePost.bind(null, post.id)}>
                      <button className="text-xs text-red-600 hover:underline">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
