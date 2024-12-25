import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // This ensures the app generates a static export
  distDir: 'out'
};

export default nextConfig;
