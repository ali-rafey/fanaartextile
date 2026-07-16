import type { ProcessStepId } from "@/content/process";
import ProcessIcon from "./process-icon";

/**
 * Branded stand-in artwork shown while a process step has no photo yet:
 * a woven-texture field with the step's icon. `tone="dark"` blends into the
 * ink carousel stage; `tone="light"` (with its ghost numeral) suits ivory
 * surfaces. Swapped out by setting `image` in content/process.ts.
 */
export default function ProcessPlaceholder({
  id,
  step,
  tone = "light",
}: {
  id: ProcessStepId;
  step?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const patternId = `weave-${tone}-${id}`;
  return (
    <div
      aria-hidden
      className={`relative h-full w-full ${
        dark
          ? "bg-gradient-to-br from-stone-800 via-ink to-stone-900"
          : "bg-gradient-to-br from-sand via-ivory to-sand"
      }`}
    >
      {/* woven-thread texture */}
      <svg className={`absolute inset-0 h-full w-full ${dark ? "text-ivory" : "text-ink"}`}>
        <defs>
          <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M0 8h16"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity={dark ? "0.09" : "0.06"}
            />
            <path
              d="M8 0v16"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity={dark ? "0.06" : "0.04"}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {step && !dark && (
        <span className="absolute right-5 bottom-1 font-display text-[6.5rem] leading-none text-ink/[0.06] select-none">
          {step}
        </span>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full border backdrop-blur-[2px] ${
            dark
              ? "border-ivory/15 bg-ivory/[0.04] text-sand"
              : "border-clay/30 bg-ivory/75 text-clay"
          }`}
        >
          <ProcessIcon id={id} className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
