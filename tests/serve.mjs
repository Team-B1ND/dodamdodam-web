import { preview } from "vite";

await preview({
  configFile: false,
  preview: { host: "127.0.0.1", port: 4175, strictPort: true },
});
