/**
 * Shown the instant an admin tab is clicked, while the server fetches.
 * Without this the whole panel sat frozen until data arrived, which is what
 * made navigation feel laggy — the work was always this slow, just invisible.
 */
export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse">
      <div className="h-7 w-48 rounded bg-stone-200" />
      <div className="mt-3 h-4 w-72 rounded bg-stone-200/70" />

      <div className="mt-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl border border-stone-200 bg-white/60" />
        ))}
      </div>
    </div>
  );
}
