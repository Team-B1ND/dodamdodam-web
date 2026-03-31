import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    svgr({ include: "**/*.svg" }),
  ],
  server: {
    host: true,
    allowedHosts: true,
    https: {
      key: fs.readFileSync("./local.dodam-dev.b1nd.com-key.pem"),
      cert: fs.readFileSync("./local.dodam-dev.b1nd.com.pem"),
    },
  },
});
