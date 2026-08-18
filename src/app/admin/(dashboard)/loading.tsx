/**
 * Shown the instant an admin tab is clicked, while the server fetches — without
 * it the panel sat frozen and navigation felt broken.
 */
export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse">
      <div className="h-9 w-52 rounded-full bg-neutral-100" />
      <div className="mt-3 h-4 w-72 rounded-full bg-neutral-100/80" />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[4/5] rounded-3xl bg-neutral-100" />
            <div className="mt-3 h-3.5 w-2/3 rounded-full bg-neutral-100" />
            <div className="mt-2 h-3 w-1/3 rounded-full bg-neutral-100/80" />
          </div>
        ))}
      </div>
    </div>
  );
}
