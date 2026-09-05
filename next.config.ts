import type { NextConfig } from "next";

const usingGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  ...(usingGitHubPages
    ? { basePath: "/sundial-os", assetPrefix: "/sundial-os", trailingSlash: true }
    : { trailingSlash: true }),
};

export default nextConfig;
