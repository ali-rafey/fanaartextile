
/**
 * Branded stand-in artwork for a thread card without a photo yet — the same
 * woven wash as the category/blog placeholders, centred on a spool-of-thread
 * glyph. Swapped out by setting `image` in content/threads.ts.
 */
/**
 * `id` is only a seed for the pattern, and threads come from Supabase now, so
 * it is any slug rather than the union of the ones shipped in content.
 */
export default function ThreadPlaceholder({ id }: { id: string }) {
  const patternId = `weave-thread-${id}`;
  return (
    <div aria-hidden className="relative h-full w-full bg-gradient-to-br from-sand via-ivory to-sand">
      <svg className="absolute inset-0 h-full w-full text-ink">
        <defs>
          <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 8h16" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
            <path d="M8 0v16" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-clay/30 bg-ivory/75 text-clay backdrop-blur-[2px]">
          {/* Spool of thread glyph */}
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="7" y="3" width="10" height="18" rx="1" />
            <path d="M7 7h10M7 17h10" />
            <path d="M9.5 10.5c1.7.9 3.3.9 5 0M9.5 13.5c1.7.9 3.3.9 5 0" />
          </svg>
        </div>
      </div>
    </div>
  );
}
