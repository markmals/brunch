import vercel from '@astrojs/vercel/edge';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';
import tailwind from './tailwind-integration';

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
