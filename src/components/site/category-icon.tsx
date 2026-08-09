import type { CategoryId } from "@/content/categories";

/**
 * Minimal line icons for the fabric-family placeholders — only shown until real
 * photography is wired into content/categories.ts.
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
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {id === "cotton" && (
        // cotton boll — a cluster of soft bolls on a stem
        <>
          <circle cx="12" cy="7.5" r="3.1" />
          <circle cx="7.8" cy="12.4" r="3.1" />
          <circle cx="16.2" cy="12.4" r="3.1" />
          <circle cx="12" cy="15.2" r="2.9" />
          <path d="M12 18.1V21" />
        </>
      )}
      {id === "linen" && (
        // basket weave — the plain over-under of a linen ground
        <>
          <rect x="4" y="4" width="16" height="16" rx="1.5" />
          <path d="M9 4v16M15 4v16M4 9h16M4 15h16" />
        </>
      )}
      {id === "modal" && (
        // fluid drape — soft vertical waves
        <>
          <path d="M7 3q2.4 3 0 6t0 6t0 6" />
          <path d="M12 3q2.4 3 0 6t0 6t0 6" />
          <path d="M17 3q2.4 3 0 6t0 6t0 6" />
        </>
      )}
      {id === "bamboo" && (
        // bamboo stalk — segmented cane with a pair of leaves
        <>
          <path d="M12 3v18" />
          <path d="M9 7.5h6M9 12h6M9 16.5h6" />
          <path d="M12 9.5c2.2-.4 3.8-2 3.8-2M12 14c-2.2-.4-3.8-2-3.8-2" />
        </>
      )}
      {id === "polyester" && (
        // continuous synthetic filaments
        <>
          <path d="M3 8.5q2.25-3 4.5 0t4.5 0t4.5 0t4.5 0" />
          <path d="M3 13q2.25-3 4.5 0t4.5 0t4.5 0t4.5 0" />
          <path d="M3 17.5q2.25-3 4.5 0t4.5 0t4.5 0t4.5 0" />
        </>
      )}
      {id === "wool" && (
        // ball of wool — wound strands
        <>
          <circle cx="12" cy="12" r="8.2" />
          <path d="M5.1 7.7c3.4.9 8.1 4.1 11.2 8.6" />
          <path d="M8.2 4.4c.8 3.3 3.6 8.2 6.6 11.1" />
          <path d="M4.2 12.6c3.3-.7 8.4-.2 12.6 2.4" />
        </>
      )}
      {id === "silk" && (
        // flowing ribbon — the lustre and movement of silk
        <>
          <path d="M4 8.5c4-4 8 4 16 0" />
          <path d="M4 13c4-4 8 4 16 0" />
          <path d="M4 17.5c4-4 8 4 16 0" />
        </>
      )}
    </svg>
  );
}
