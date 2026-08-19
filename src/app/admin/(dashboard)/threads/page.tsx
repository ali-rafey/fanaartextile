import { listAllThreads, type ThreadRow } from "@/lib/db/threads";
import {
  AddButton,
  EmptyState,
  ErrorState,
  ListHeader,
  ListShell,
  PageHeading,
  RowActions,
  StatusPill,
  Thumb,
} from "@/components/admin/list";
import { removeThread, seedThreads } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminThreadsPage() {
  let threads: ThreadRow[] = [];
  let error: string | null = null;

  try {
    threads = await listAllThreads();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load threads.";
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeading
        title="Threads"
        subtitle={`${threads.length || "No"} stitching ${threads.length === 1 ? "thread" : "threads"}`}
        action={<AddButton href="/admin/threads/new">New thread</AddButton>}
      />

      {error ? (
        <ErrorState message={error} />
      ) : threads.length === 0 ? (
        <EmptyState
          message="No threads yet — the site is showing its built-in range."
          action={
            <form action={seedThreads}>
              <button className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
                Import built-in range
              </button>
            </form>
          }
        />
      ) : (
        <ListShell>
          <ListHeader columns={["Thread", "Properties", "Status"]} />
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="flex items-center gap-4 border-b border-neutral-100 px-4 py-2.5 last:border-b-0 hover:bg-neutral-50"
            >
              <Thumb src={thread.image} alt={thread.alt || thread.name} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-900">{thread.name}</p>
                <p className="truncate text-xs text-neutral-400">{thread.description}</p>
              </div>

              <div className="hidden w-40 shrink-0 sm:block">
                <p className="truncate text-xs text-neutral-600">
                  {(thread.properties ?? []).join(", ") || "—"}
                </p>
              </div>

              <div className="hidden w-24 shrink-0 sm:block">
                <StatusPill published={thread.published} />
              </div>

              <RowActions
                editHref={`/admin/threads/${thread.id}`}
                onDelete={removeThread.bind(null, thread.id)}
                label={thread.name}
              />
            </div>
          ))}
        </ListShell>
      )}
    </div>
  );
}
