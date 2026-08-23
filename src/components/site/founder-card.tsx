import Image from "next/image";
import { ABOUT_FOUNDER } from "@/content/about";

/**
 * The founder card beside the note on /about.
 *
 * Stripped to what the note cannot say for itself: the face, and somewhere to
 * go. The name is not repeated here — the letter is signed underneath it — so
 * the card is a portrait standing on a soft panel with a single action bar
 * beneath, and nothing else competing for the eye.
 */
export default function FounderCard() {
  const { portrait, portraitAlt, site, socials } = ABOUT_FOUNDER;

  return (
    <article className="mx-auto w-full max-w-[17rem] rounded-[1.5rem] bg-ivory p-2.5 shadow-[0_26px_60px_-38px_rgba(27,24,21,0.55)] ring-1 ring-ink/[0.07] md:mx-0 md:ml-auto">
      {/* Stage — the cut-out stands on the panel */}
      <div className="relative aspect-square overflow-hidden rounded-[1.05rem] bg-[#efede8]">
        <Image
          src={portrait}
          alt={portraitAlt}
          fill
          sizes="(min-width: 768px) 17rem, 80vw"
          className="scale-[1.04] object-contain object-bottom"
        />
      </div>

      <div className="flex items-center justify-between gap-2 px-1 pt-3 pb-0.5">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={social.name}
            title={social.name}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink/70 ring-1 ring-ink/15 transition-colors duration-300 ease-lux hover:bg-ink hover:text-ivory hover:ring-ink"
          >
            <InstagramMark />
          </a>
        ))}

        <a
          href={site.href}
          target="_blank"
          rel="noopener noreferrer me"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ivory transition-colors duration-300 ease-lux hover:bg-clay-deep"
        >
          {site.label}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  );
}

function InstagramMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden
      className="h-[15px] w-[15px]"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
