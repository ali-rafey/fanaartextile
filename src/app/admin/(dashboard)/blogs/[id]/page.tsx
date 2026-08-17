import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostRow } from "@/lib/db/blogs";
import { savePost } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-clay focus:ring-2 focus:ring-clay/20";
const label = "block text-xs font-medium text-stone-600";

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
      <Link href="/admin/blogs" className="text-xs text-stone-500 hover:text-clay">
        ← Journal
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">{isNew ? "New post" : "Edit post"}</h1>

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
              Slug <span className="text-stone-400">(auto from title if blank)</span>
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

        <div className="flex items-center justify-between gap-6 rounded-lg border border-stone-200 bg-white px-4 py-3">
          <div>
            <label htmlFor="sort_order" className={label}>
              Sort order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={post?.sort_order ?? 0}
              className="mt-1.5 w-24 rounded-lg border border-stone-300 px-3 py-1.5 text-sm outline-none focus:border-clay"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published ?? true}
              className="h-4 w-4 accent-clay"
            />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-clay-deep">
            Save post
          </button>
          <Link
            href="/admin/blogs"
            className="rounded-full border border-stone-300 px-6 py-2.5 text-sm text-stone-600 transition-colors hover:border-stone-400"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
