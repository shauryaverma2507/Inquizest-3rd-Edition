import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/Inquizest-3rd-Edition/",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },

    spa: {
      enabled: true,
      prerender: {
        outputPath: "index.html",
        crawlLinks: false,
      },
    },
  },
});
