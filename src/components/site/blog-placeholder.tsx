import type { BlogId } from "@/content/blogs";

/**
 * Stand-in artwork for a journal image without a photo yet. Tuned to read like
 * the muted black-and-white archival photography the journal is built around —
 * a warm-grey duotone with a whisper of weave and a centred journal glyph.
 * Swapped out by setting `image` in content/blogs.ts.
 */
export default function BlogPlaceholder({ id }: { id: BlogId }) {
  const patternId = `weave-blog-${id}`;
  return (
    <div
      aria-hidden
      className="relative h-full w-full bg-gradient-to-br from-stone-400 via-stone-500 to-stone-700"
    >
      <svg className="absolute inset-0 h-full w-full text-white">
        <defs>
          <pattern id={patternId} width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M0 9h18" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
            <path d="M9 0v18" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-8 w-8 text-white/45"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 6.5C10.5 5.2 8.5 4.7 6 4.9c-.6 0-1 .5-1 1.1v10.4c0 .6.5 1.1 1.1 1 2.3-.2 4.2.3 5.9 1.6 1.7-1.3 3.6-1.8 5.9-1.6.6 0 1.1-.4 1.1-1V6c0-.6-.4-1.1-1-1.1-2.5-.2-4.5.3-6 1.6Z" />
          <path d="M12 6.5V19" />
        </svg>
      </div>
    </div>
  );
}
