import type { CategoryId } from "@/content/categories";

/**
 * Minimal line icons for the category placeholders (fabric layers from
 * Lucide (ISC), shirt from Lucide, thread spool hand-drawn to match).
 */
export default function CategoryIcon({
  id,
  className,
}: {
  id: CategoryId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {id === "fabrics" && (
        // stacked layers — folded fabric
        <>
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        </>
      )}
      {id === "threads" && (
        // thread spool with a loose tail
        <>
          <path d="M8 4h8" />
          <path d="M8 20h8" />
          <path d="M9.5 4v16" />
          <path d="M14.5 4v16" />
          <path d="M9.5 8.5h5" />
          <path d="M9.5 12h5" />
          <path d="M9.5 15.5h5" />
          <path d="M14.5 18c2.5.5 4 1.5 5.5 3" />
        </>
      )}
      {id === "loungewear" && (
        // shirt — finished garments
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      )}
    </svg>
  );
}
