import type { Metadata } from "next";
import FeedbackForm from "@/components/site/feedback-form";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { FEEDBACK_LOOP } from "@/content/feedback";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Share your experience with Fanaar fabric. Your feedback flows straight back into how we source, test and finish every collection.",
  alternates: { canonical: "/feedback" },
  openGraph: {
    title: "Feedback · Fanaar Textile",
    description:
      "Share your experience with Fanaar fabric. Your feedback flows straight back into how we source, test and finish every collection.",
    url: "/feedback",
  },
};

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
            {/* Left — why this matters */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink/70">(03)</p>
                <h1 className="mt-5 font-display text-5xl leading-[0.98] tracking-tight text-ink md:text-6xl">
                  Help shape
                  <br />
                  the next metre.
                </h1>
                <p className="mt-7 max-w-sm leading-relaxed text-ink/60">
                  At Fanaar the cycle doesn&apos;t end at delivery. What you tell us about
                  the cloth you live in flows straight back into how the next run is made.
                </p>

                <ol className="mt-12">
                  {FEEDBACK_LOOP.map((item, i) => (
                    <li
                      key={item.step}
                      className="flex items-baseline gap-5 border-t border-ink/10 py-4 last:border-b"
                    >
                      <span className="font-mono text-[0.6rem] tracking-[0.2em] text-clay">
                        ({String(i + 1).padStart(2, "0")})
                      </span>
                      <span className="flex-1 text-ink">{item.step}</span>
                      <span className="hidden max-w-[18ch] text-right text-xs text-ink/60 sm:block">
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Right — the form */}
            <Reveal delay={120}>
              <FeedbackForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
