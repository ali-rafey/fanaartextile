/**
 * Single source of truth for SEO metadata. The canonical origin drives
 * metadataBase, canonical URLs, Open Graph, the sitemap and robots.txt —
 * override per environment with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fanaartextile.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Fanaar Textile";
export const SITE_TAGLINE = "Premium Lounge & Loungewear Fabric";

export const SITE_DESCRIPTION =
  "Fanaar Textile is a premium lounge and loungewear fabric house — twill, " +
  "jersey, piqué, fleece and French terry, sourced from audited mills, " +
  "lab-tested for GSM, shrinkage and colourfastness, and finished to one standard.";

/** Fallback social share image (the brand mark on ivory). */
export const OG_IMAGE = {
  url: "/images/brand/logo-ink.png",
  width: 1131,
  height: 823,
  alt: "Fanaar Textile",
};

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Organization + WebSite graph — emitted once, on the homepage. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "Fanaar",
        url: SITE_URL,
        logo: absoluteUrl(OG_IMAGE.url),
        description: SITE_DESCRIPTION,
        email: "hello@fanaar.com",
        knowsAbout: [
          "Lounge fabric",
          "Loungewear textiles",
          "Knitted fabric",
          "Woven fabric",
          "Fabric sourcing",
          "Textile testing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

/** Breadcrumb trail for interior pages. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
