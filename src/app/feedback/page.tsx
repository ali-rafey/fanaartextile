import type { Metadata } from "next";
import FeedbackForm from "@/components/site/feedback-form";
import PageHero from "@/components/site/page-hero";
import Reveal from "@/components/site/reveal";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Share your experience with Fanaar. Your feedback flows straight back into how we source, test and finish every collection.",
};

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Feedback"
          heading="Help shape the next metre"
          intro="At Fanaar the cycle doesn't end at delivery. What you tell us about the fabric you live in flows straight back into sourcing, testing and production — and returns to you as better cloth."
        />

        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-6">
            <Reveal>
              <FeedbackForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
