import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Fanaar",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#1b1815",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
