import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@repo/api",
    "@repo/core",
    "@repo/db",
    "@repo/validators",
  ],
  // Silence multi-lockfile warning in monorepo
  outputFileTracingRoot: path.join(__dirname, "../../"),
  experimental: {
    // Maps .js imports to .ts sources in transpiled workspace packages (webpack)
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js"],
    },
  },
};

export default nextConfig;
