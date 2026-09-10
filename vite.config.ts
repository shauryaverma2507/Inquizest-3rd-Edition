// @lovable.dev/vite-tanstack-config already includes the required
// TanStack Start, React, Tailwind, Nitro, etc. plugins.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },

    prerender: {
      enabled: true,
      crawlLinks: true,
      autoStaticPathsDiscovery: true,
      failOnError: true,
    },
  },
});
