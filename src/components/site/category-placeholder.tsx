import type { CategoryId } from "@/content/categories";
import CategoryIcon from "./category-icon";

/**
 * Branded stand-in artwork for a category card without a photo yet — same
 * woven visual language as the process placeholders. Swapped out by setting
 * `image` in content/categories.ts.
 */
export default function CategoryPlaceholder({ id }: { id: CategoryId }) {
  const patternId = `weave-category-${id}`;
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
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-clay/30 bg-ivory/75 text-clay backdrop-blur-[2px]">
          <CategoryIcon id={id} className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
}
