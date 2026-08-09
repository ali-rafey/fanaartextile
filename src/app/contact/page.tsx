import type { Metadata } from "next";
import ContactForm from "@/components/site/contact-form";
import PageHero from "@/components/site/page-hero";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { CONTACT_DETAILS, CONTACT_HERO } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Fanaar — for fabric sourcing, collaborations or any question about how we work.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={CONTACT_HERO.eyebrow}
          heading={CONTACT_HERO.heading}
          intro={CONTACT_HERO.intro}
        />

        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            {/* Details */}
            <Reveal>
              <div>
                <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                  Reach us directly
                </h2>
                <p className="mt-4 leading-relaxed text-stone-600">
                  Prefer to reach out the old-fashioned way? Here's where to find
                  us.
                </p>

                <dl className="mt-10 space-y-8">
                  {CONTACT_DETAILS.map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-xs uppercase tracking-[0.2em] text-clay">
                        {detail.label}
                      </dt>
                      <dd className="mt-2 text-lg text-ink">
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="transition-colors hover:text-clay"
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
              </div>
            </Reveal>

            {/* Form */}
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
