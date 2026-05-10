import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "sitemap.xml"],
      manifest: {
        name: "Yuvraj Singh | AI & Full Stack Engineer",
        short_name: "Yuvraj.Portfolio",
        description:
          "Cyberpunk-themed portfolio of an AI & Full Stack Engineer specializing in agentic workflows.",
        theme_color: "#050505",
        background_color: "#050505",
        display: "standalone",
        scope: "/My-Portfolio/",
        start_url: "/My-Portfolio/",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/My-Portfolio/index.html",
        globPatterns: ["**/*.{js,css,html,svg,json,xml,txt}"],
      },
    }),
  ],
  base: "/My-Portfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "framer-motion": ["framer-motion"],
          "lucide-react": ["lucide-react"],
        },
      },
    },
  },
});
