import { listFeedback, type FeedbackRow } from "@/lib/db/feedback";
import { markFeedback, removeFeedback } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-emerald-100 text-emerald-700",
  read: "bg-stone-200 text-stone-600",
  archived: "bg-amber-100 text-amber-700",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-clay" aria-label={`${rating} out of 5`}>
      {"★".repeat(rating)}
      <span className="text-stone-300">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function Message({ item }: { item: FeedbackRow }) {
  return (
    <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-ink">
            {item.name}{" "}
            <a
              href={`mailto:${item.email}`}
              className="text-sm font-normal text-stone-500 hover:text-clay"
            >
              {item.email}
            </a>
          </p>
          <p className="mt-0.5 text-xs text-stone-500">
            {new Date(item.created_at).toLocaleString()}
            {item.topic ? ` · ${item.topic}` : ""}
            {item.subject ? ` · ${item.subject}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {item.rating ? <Stars rating={item.rating} /> : null}
          <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-600 capitalize">
            {item.kind}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
              STATUS_STYLES[item.status] ?? STATUS_STYLES.read
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">
        {item.message}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-stone-100 pt-3 text-xs">
        {item.status !== "read" && (
          <form action={markFeedback.bind(null, item.id, "read")}>
            <button className="rounded-full border border-stone-300 px-3 py-1 text-stone-600 transition-colors hover:border-clay hover:text-clay">
              Mark read
            </button>
          </form>
        )}
        {item.status !== "archived" && (
          <form action={markFeedback.bind(null, item.id, "archived")}>
            <button className="rounded-full border border-stone-300 px-3 py-1 text-stone-600 transition-colors hover:border-clay hover:text-clay">
              Archive
            </button>
          </form>
        )}
        {item.status !== "new" && (
          <form action={markFeedback.bind(null, item.id, "new")}>
            <button className="rounded-full border border-stone-300 px-3 py-1 text-stone-600 transition-colors hover:border-clay hover:text-clay">
              Mark unread
            </button>
          </form>
        )}
        <form action={removeFeedback.bind(null, item.id)} className="ml-auto">
          <button className="rounded-full border border-red-200 px-3 py-1 text-red-600 transition-colors hover:bg-red-50">
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}

export default async function AdminFeedbackPage() {
  let items: FeedbackRow[] = [];
  let error: string | null = null;

  try {
    items = await listFeedback();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load feedback.";
  }

  const unread = items.filter((i) => i.status === "new").length;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold">Feedback</h1>
      <p className="mt-1 text-sm text-stone-500">
        Messages from the contact and feedback forms.
        {items.length ? ` ${items.length} total · ${unread} unread.` : ""}
      </p>

      {error ? (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <p className="font-medium">Could not load messages.</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-amber-700">
            If the table is missing, run the v2 section of{" "}
            <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code> in the
            Supabase SQL editor.
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
          <p className="text-sm text-stone-500">
            No messages yet. Submissions from{" "}
            <span className="font-medium text-stone-700">/contact</span> and{" "}
            <span className="font-medium text-stone-700">/feedback</span> land here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <Message key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
