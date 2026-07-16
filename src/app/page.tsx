import CategorySection from "@/components/site/category-section";
import Hero from "@/components/site/hero";
import ProcessSection from "@/components/site/process-section";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProcessSection />
      <CategorySection />
    </main>
  );
}
