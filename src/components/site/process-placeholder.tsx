import type { ProcessStepId } from "@/content/process";
import ProcessIcon from "./process-icon";

/**
 * Branded stand-in artwork shown while a process step has no photo yet:
 * a woven-texture field in the fabric palette with the step's icon and a
 * ghosted step numeral. Swapped out by setting `image` in content/process.ts.
 */
export default function ProcessPlaceholder({
  id,
  step,
}: {
  id: ProcessStepId;
  step: string;
}) {
  const patternId = `weave-${id}`;
  return (
    <div aria-hidden className="relative h-full w-full bg-gradient-to-br from-sand via-ivory to-sand">
      {/* woven-thread texture */}
      <svg className="absolute inset-0 h-full w-full text-ink">
        <defs>
          <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 8h16" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
            <path d="M8 0v16" stroke="currentColor" strokeWidth="0.5" opacity="0.04" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <span className="absolute right-5 bottom-1 font-display text-[6.5rem] leading-none text-ink/[0.06] select-none">
        {step}
      </span>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-clay/30 bg-ivory/75 text-clay backdrop-blur-[2px]">
          <ProcessIcon id={id} className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
