import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://geniusz.vercel.app",
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  vite: {
    resolve: {
      alias: {
        '.prisma/client/edge': './node_modules/@prisma/client/edge.js',
      }
    }
  },
  integrations: [svelte(), react(), tailwind({
    applyBaseStyles: false,
  })],
});