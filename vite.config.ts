import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },

    prerender: {
      enabled: true,
      crawlLinks: false,
      autoStaticPathsDiscovery: true,
      failOnError: true,
    },
  },
});
