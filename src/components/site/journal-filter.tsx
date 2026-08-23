import Link from "next/link";
import { DYE_NEUTRAL, dyeFor } from "@/lib/dye";

/**
 * Category rail for the Journal archive — every category wearing the dye it
 * wears everywhere else, so the wall below can be read by colour before it is
 * read by word. The active chip fills with its dye; the rest stay as outlines.
 */
export default function JournalFilter({
  categories,
  active,
}: {
  categories: string[];
  active?: string;
}) {
  const chips = [
    { label: "All posts", href: "/blogs", dye: DYE_NEUTRAL, on: !active },
    ...categories.map((label) => ({
      label,
      href: `/blogs?category=${encodeURIComponent(label)}`,
      dye: dyeFor(label),
      on: active?.toLowerCase() === label.toLowerCase(),
    })),
  ];

  return (
    <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
      {chips.map((chip) => (
        <li key={chip.label}>
          <Link
            href={chip.href}
            aria-current={chip.on ? "page" : undefined}
            className={`inline-flex items-center gap-2 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] transition-colors duration-[420ms] ease-lux ${
              chip.on ? "text-ink" : "text-ink/60 hover:text-ink/75"
            }`}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full transition-transform duration-[420ms] ease-lux"
              style={{
                backgroundColor: chip.dye.ink,
                transform: chip.on ? "scale(1.6)" : "scale(1)",
              }}
            />
            {chip.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
