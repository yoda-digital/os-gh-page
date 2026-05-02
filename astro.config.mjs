import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://opensource.yoda.digital",
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: { enabled: true },
  }),
  integrations: [
    mdx(),
    react(),
    sitemap({
      i18n: {
        defaultLocale: "ro",
        locales: {
          ro: "ro-MD",
          en: "en-US",
          ru: "ru-RU",
        },
      },
      filter: (page) => !page.includes("/api/"),
      changefreq: undefined,
      priority: undefined,
      lastmod: new Date(),
    }),
  ],
  i18n: {
    defaultLocale: "ro",
    locales: ["ro", "en", "ru"],
    routing: { prefixDefaultLocale: false },
  },
  // Astro 5 enables a CSRF-style Origin check on all non-GET requests by
  // default. /api/github-webhook is a cross-origin POST receiver (GitHub
  // posts from its own infrastructure), so the default check 403s every
  // delivery. Disable it — the route has its own HMAC-SHA256 signature
  // verification (see src/pages/api/github-webhook.ts) which is stricter
  // than an Origin header check.
  security: {
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
});
