import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Custom 404 — keeps visitors (and crawlers) moving into real content. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-clay">404</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            This thread runs out here.
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-ink/60">
            The page you were looking for has moved or never existed. The fabric
            library is a good place to pick the trail back up.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/fabrics"
              className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 ease-lux hover:bg-clay-deep"
            >
              Browse fabrics
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-ink/15 px-8 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors duration-300 ease-lux hover:border-clay hover:text-clay"
            >
              Back home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
