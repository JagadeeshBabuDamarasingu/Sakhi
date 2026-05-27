import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["firebase", "react-icons"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
