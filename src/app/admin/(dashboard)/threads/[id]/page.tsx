import Link from "next/link";
import { notFound } from "next/navigation";
import { getThreadRow } from "@/lib/db/threads";
import { saveThread } from "../actions";
import ImageField from "@/components/admin/image-field";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900";
const label = "block text-xs font-semibold text-neutral-600";

export default async function ThreadEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const thread = isNew ? null : await getThreadRow(id);
  if (!isNew && !thread) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/threads" className="text-xs font-semibold text-neutral-500 hover:text-neutral-900">
        ← Threads
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
        {isNew ? "New thread" : "Edit thread"}
      </h1>

      <form action={saveThread} className="mt-6 space-y-4">
        {thread ? <input type="hidden" name="id" value={thread.id} /> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Spun polyester"
              defaultValue={thread?.name ?? ""}
              className={`mt-1.5 ${field}`}
            />
          </div>
          <div>
            <label htmlFor="slug" className={label}>
              Slug <span className="font-normal text-neutral-400">(auto if blank)</span>
            </label>
            <input id="slug" name="slug" defaultValue={thread?.slug ?? ""} className={`mt-1.5 ${field}`} />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={thread?.description ?? ""}
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div>
          <label htmlFor="properties" className={label}>
            Properties <span className="font-normal text-neutral-400">(one per line)</span>
          </label>
          <textarea
            id="properties"
            name="properties"
            rows={4}
            placeholder={"High tensile\nColourfast\nHeat-resistant"}
            defaultValue={(thread?.properties ?? []).join("\n")}
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <ImageField name="image" folder="threads" defaultValue={thread?.image ?? ""} />
          <div>
            <label htmlFor="alt" className={label}>
              Image alt text
            </label>
            <input id="alt" name="alt" defaultValue={thread?.alt ?? ""} className={`mt-1.5 ${field}`} />
            <p className="mt-2 text-xs text-neutral-500">
              Describes the image for screen readers and search engines.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 rounded-xl border border-neutral-200 px-4 py-3">
          <div>
            <label htmlFor="sort_order" className={label}>
              Sort order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={thread?.sort_order ?? 0}
              className="mt-1.5 w-24 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm outline-none focus:border-neutral-900"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <input
              type="checkbox"
              name="published"
              defaultChecked={thread?.published ?? true}
              className="h-4 w-4 accent-neutral-900"
            />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
            Save thread
          </button>
          <Link
            href="/admin/threads"
            className="rounded-full border border-neutral-200 px-6 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
