import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["three"],
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;

