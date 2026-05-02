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
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "auto",
  },
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
});
