import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: "./src/test/global-setup.ts",
    // Longer timeout: Testcontainers pulls image on first run
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
