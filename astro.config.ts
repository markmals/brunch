import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/edge";
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [tailwind(), vue()],
  vite: {
    resolve: {
      alias: {
        ".prisma/client/edge": "./node_modules/.prisma/client/edge.js"
      }
    }
  }
});