import preact from "@astrojs/preact"
import svelte from "@astrojs/svelte"
import vercel from "@astrojs/vercel/edge"
import prefresh from "@prefresh/vite"
import { defineConfig } from "astro/config"
import tailwind from "./tailwind-integration"

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: vercel(),
    integrations: [
        preact({
            compat: true,
        }),
        tailwind(),
        svelte(),
    ],
    vite: {
        plugins: [prefresh()],
        resolve: {
            alias: {
                ".prisma/client/edge": "./node_modules/.prisma/client/edge.js",
            },
        },
        ssr: {
            noExternal: [
                "react-aria",
                "react-stately",
                "@react-stately/*",
                "@react-aria/*",
                "react-aria-components",
                "preact-heroicons",
            ],
        },
    },
})
