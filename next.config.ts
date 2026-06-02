import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["three"],
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
