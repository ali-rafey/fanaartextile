import Image from "next/image";
import Link from "next/link";
import { NAV_LEFT, NAV_RIGHT } from "@/content/navigation";

/**
 * Shared site footer for interior pages — brand mark and one-line ethos on the
 * left, the primary navigation grouped on the right, a hairline, then the
 * legal row. Ink surface to bookend the ivory pages.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-block" aria-label="Fanaar — home">
              <Image
                src="/images/brand/logo-ivory.png"
                alt="Fanaar"
                width={1131}
                height={823}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ivory/60">
              Premium lounge and loungewear fabric — sourced, tested and
              finished to a single standard, and made to be lived in.
            </p>
          </div>

          <nav aria-label="Explore" className="text-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-clay">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV_LEFT.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="text-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-clay">Company</p>
            <ul className="mt-5 space-y-3">
              {NAV_RIGHT.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/12 pt-8 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Fanaar. All rights reserved.</p>
          <p className="tracking-[0.15em] uppercase">Crafted for the way you rest</p>
        </div>
      </div>
    </footer>
  );
}
