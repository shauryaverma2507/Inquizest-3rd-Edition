import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/Inquizest/",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },

    spa: {
      enabled: true,

      prerender: {
        outputPath: "index.html",
        crawlLinks: true,
      },
    },
  },
});
