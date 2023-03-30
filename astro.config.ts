import node from "@astrojs/node"
import solid from "@astrojs/solid-js"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"

export default defineConfig({
    output: "server",
    integrations: [solid(), tailwind()],
    adapter: node({ mode: "standalone" }), //vercel(),
    vite: {
        resolve: {
            alias: {
                ".prisma/client/edge": "./node_modules/.prisma/client/edge.js",
            },
        },
    },
})
