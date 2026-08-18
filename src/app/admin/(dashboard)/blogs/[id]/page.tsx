import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostRow } from "@/lib/db/blogs";
import { savePost } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-2xl bg-neutral-100 px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900";
const label = "block text-xs font-semibold text-neutral-600";

export default async function BlogEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const post = isNew ? null : await getPostRow(id);
  if (!isNew && !post) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/blogs" className="text-xs font-semibold text-neutral-500 hover:text-neutral-900">
        ← Journal
      </Link>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">{isNew ? "New post" : "Edit post"}</h1>

      <form action={savePost} className="mt-8 space-y-5">
        {post ? <input type="hidden" name="id" value={post.id} /> : null}

        <div>
          <label htmlFor="title" className={label}>
            Title
          </label>
          <input id="title" name="title" required defaultValue={post?.title ?? ""} className={`mt-1.5 ${field}`} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="slug" className={label}>
              Slug <span className="text-neutral-400">(auto from title if blank)</span>
            </label>
            <input id="slug" name="slug" defaultValue={post?.slug ?? ""} className={`mt-1.5 ${field}`} />
          </div>
          <div>
            <label htmlFor="category" className={label}>
              Category
            </label>
            <input
              id="category"
              name="category"
              placeholder="Craft, Materials, Care Guide…"
              defaultValue={post?.category ?? ""}
              className={`mt-1.5 ${field}`}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="published_on" className={label}>
              Date label
            </label>
            <input
              id="published_on"
              name="published_on"
              placeholder="July 2026"
              defaultValue={post?.published_on ?? ""}
              className={`mt-1.5 ${field}`}
            />
          </div>
          <div>
            <label htmlFor="read_time" className={label}>
              Read time
            </label>
            <input
              id="read_time"
              name="read_time"
              placeholder="4 min read"
              defaultValue={post?.read_time ?? ""}
              className={`mt-1.5 ${field}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className={label}>
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={post?.excerpt ?? ""}
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div>
          <label htmlFor="body" className={label}>
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows={10}
            defaultValue={post?.body ?? ""}
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="image" className={label}>
              Image path
            </label>
            <input
              id="image"
              name="image"
              placeholder="/images/blogs/gsm.jpg"
              defaultValue={post?.image ?? ""}
              className={`mt-1.5 ${field}`}
            />
          </div>
          <div>
            <label htmlFor="alt" className={label}>
              Image alt text
            </label>
            <input id="alt" name="alt" defaultValue={post?.alt ?? ""} className={`mt-1.5 ${field}`} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 rounded-2xl bg-neutral-50 px-5 py-4">
          <div>
            <label htmlFor="sort_order" className={label}>
              Sort order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={post?.sort_order ?? 0}
              className="mt-1.5 w-24 rounded-xl bg-neutral-100 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published ?? true}
              className="h-4 w-4 accent-neutral-900"
            />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="rounded-full bg-neutral-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
            Save post
          </button>
          <Link
            href="/admin/blogs"
            className="rounded-full bg-neutral-100 px-7 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
