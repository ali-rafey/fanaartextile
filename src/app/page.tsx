import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import CategorySection from "@/components/site/category-section";
import FeaturedBlogs from "@/components/site/featured-blogs";
import Hero from "@/components/site/hero";
import ProcessSection from "@/components/site/process-section";
import { SITE_DESCRIPTION, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  // Homepage keeps the brand-led default title from the root layout.
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { url: "/", description: SITE_DESCRIPTION },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <main>
        <Hero />
        <ProcessSection />
        <CategorySection />
        <FeaturedBlogs />
      </main>
    </>
  );
}
