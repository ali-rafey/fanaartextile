/** Instant feedback on tab switches — mirrors the compact list layout. */
export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse">
      <div className="h-8 w-44 rounded-lg bg-neutral-100" />
      <div className="mt-2 h-4 w-56 rounded bg-neutral-100/80" />

      <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200">
        <div className="h-10 border-b border-neutral-200 bg-neutral-50" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-neutral-100 px-4 py-3">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-neutral-100" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-neutral-100" />
              <div className="h-2.5 w-1/4 rounded bg-neutral-100/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
