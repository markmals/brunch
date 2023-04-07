import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/edge';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';

export default defineConfig({
    output: 'server',
    adapter: vercel(),
    integrations: [vue(), tailwind()],
    vite: {
        resolve: {
            alias: {
                '.prisma/client/edge': './node_modules/.prisma/client/edge.js',
            },
        },
    },
});
