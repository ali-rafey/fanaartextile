import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Media served from Supabase storage (hero video poster, uploaded imagery).
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
    // Modern formats keep Largest Contentful Paint (a ranking signal) down.
    formats: ["image/avif", "image/webp"],
  },
  // Strip the "X-Powered-By: Next.js" fingerprint.
  poweredByHeader: false,
  // Trailing-slash-free URLs, one canonical form per page.
  trailingSlash: false,
};

export default nextConfig;
