import preact from "@astrojs/preact"
import vercel from "@astrojs/vercel/edge"
import prefresh from "@prefresh/vite"
import { defineConfig } from "astro/config"
import tailwind from "./tailwind-integration"

export default defineConfig({
    output: "server",
    adapter: vercel(),
    integrations: [preact({ compat: true }), tailwind()],
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
