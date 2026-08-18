import { listFeedback, type FeedbackRow } from "@/lib/db/feedback";
import { markFeedback, removeFeedback } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-neutral-900 text-white",
  read: "bg-neutral-100 text-neutral-600",
  archived: "bg-amber-100 text-amber-700",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-neutral-900" aria-label={`${rating} out of 5`}>
      {"★".repeat(rating)}
      <span className="text-neutral-200">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function Message({ item }: { item: FeedbackRow }) {
  return (
    <article className="rounded-3xl bg-neutral-50 p-6 transition-colors hover:bg-neutral-100/70">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold text-neutral-900">
            {item.name}{" "}
            <a
              href={`mailto:${item.email}`}
              className="text-sm font-normal text-neutral-500 hover:text-neutral-900"
            >
              {item.email}
            </a>
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">
            {new Date(item.created_at).toLocaleString()}
            {item.topic ? ` · ${item.topic}` : ""}
            {item.subject ? ` · ${item.subject}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {item.rating ? <Stars rating={item.rating} /> : null}
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-600 capitalize shadow-sm">
            {item.kind}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              STATUS_STYLES[item.status] ?? STATUS_STYLES.read
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-neutral-700">
        {item.message}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-200/70 pt-3 text-xs">
        {item.status !== "read" && (
          <form action={markFeedback.bind(null, item.id, "read")}>
            <button className="rounded-full bg-white px-4 py-2 font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-200/70">
              Mark read
            </button>
          </form>
        )}
        {item.status !== "archived" && (
          <form action={markFeedback.bind(null, item.id, "archived")}>
            <button className="rounded-full bg-white px-4 py-2 font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-200/70">
              Archive
            </button>
          </form>
        )}
        {item.status !== "new" && (
          <form action={markFeedback.bind(null, item.id, "new")}>
            <button className="rounded-full bg-white px-4 py-2 font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-200/70">
              Mark unread
            </button>
          </form>
        )}
        <form action={removeFeedback.bind(null, item.id)} className="ml-auto">
          <button className="rounded-full px-4 py-2 font-semibold text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600">
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
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Feedback</h1>
      <p className="mt-1.5 text-sm text-neutral-500">
        Messages from the contact and feedback forms.
        {items.length ? ` ${items.length} total · ${unread} unread.` : ""}
      </p>

      {error ? (
        <div className="mt-8 rounded-3xl bg-amber-50 p-6 text-sm text-amber-900">
          <p className="font-semibold">Could not load messages.</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2">
            If the table is missing, run the v2 section of{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/schema.sql</code> in the
            Supabase SQL editor.
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-neutral-50 p-12 text-center">
          <p className="text-sm text-neutral-500">
            No messages yet. Submissions from{" "}
            <span className="font-semibold text-neutral-700">/contact</span> and{" "}
            <span className="font-semibold text-neutral-700">/feedback</span> land here.
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
