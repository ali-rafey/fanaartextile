/**
 * Emits a JSON-LD block. Structured data is what lets Google show rich
 * results (products, breadcrumbs, articles) rather than a plain blue link.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered from our own content — no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
