import type { Metadata } from "next";
import ContactForm from "@/components/site/contact-form";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { CONTACT_DETAILS, CONTACT_HERO } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Fanaar Textile for fabric sourcing, sample requests, production runs or collaborations. Email hello@fanaar.com and a real person will reply.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us · Fanaar Textile",
    description:
      "Contact Fanaar Textile for fabric sourcing, sample requests, production runs or collaborations. Email hello@fanaar.com and a real person will reply.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-ivory">
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
            {/* Left — statement and details, held in place while the form scrolls */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink/70">
                  {CONTACT_HERO.index}
                </p>
                <h1 className="mt-5 font-display text-5xl leading-[0.98] tracking-tight text-ink whitespace-pre-line md:text-6xl">
                  {CONTACT_HERO.statement}
                </h1>
                <p className="mt-7 max-w-sm leading-relaxed text-ink/55">
                  {CONTACT_HERO.intro}
                </p>

                <dl className="mt-12">
                  {CONTACT_DETAILS.map((detail) => (
                    <div
                      key={detail.label}
                      className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-4 last:border-b"
                    >
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/45">
                        {detail.label}
                      </dt>
                      <dd className="text-right text-ink">
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="transition-colors duration-300 ease-lux hover:text-clay"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          detail.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 font-mono text-[0.6rem] leading-[1.9] uppercase tracking-[0.16em] text-ink/40">
                  {CONTACT_HERO.caption.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right — the form */}
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
