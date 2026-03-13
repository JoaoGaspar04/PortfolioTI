import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

// BASE_PATH opcional, default para "/"
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    // Plugins de dev só fora de produção
    ...(isProduction
      ? []
      : [
          // mockupPreviewPlugin só em dev
          await import("./mockupPreviewPlugin").then((m) => m.mockupPreviewPlugin()),
        ]),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});