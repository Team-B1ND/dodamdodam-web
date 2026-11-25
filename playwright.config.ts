import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:4175",
    channel: "chrome",
    launchOptions: {
      chromiumSandbox: true,
      ignoreDefaultArgs: ["--disable-self-xss-warnings"],
    },
    trace: "off",
  },
  webServer: {
    command: "pnpm run build && node tests/serve.mjs",
    env: { VITE_API_URL: "http://127.0.0.1:4175/api" },
    url: "http://127.0.0.1:4175",
    reuseExistingServer: false,
  },
});
