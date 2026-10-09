import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Disable strict dynamic blocking prerender checks for client-rendered dynamic routes
  }
};

export default nextConfig;
