import vercel from '@astrojs/vercel/edge';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';
import tailwind from './tailwind-integration';

import ReactivityTransform from '@vue-macros/reactivity-transform';

export default defineConfig({
    output: 'server',
    adapter: vercel(),
    integrations: [vue(), tailwind()],
    vite: {
        plugins: [ReactivityTransform.vite()],
        resolve: {
            alias: {
                '.prisma/client/edge': './node_modules/.prisma/client/edge.js',
            },
        },
    },
});
