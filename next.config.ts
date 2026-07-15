import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Supabase storage will serve hero/product media once integrated.
  // Add the project's *.supabase.co hostname to `images.remotePatterns`
  // when we start rendering product images through next/image.
};

export default nextConfig;
