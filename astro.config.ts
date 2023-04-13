import react from '@astrojs/react';
import vercel from '@astrojs/vercel/edge';
// import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'astro/config';
import tailwind from './tailwind-integration';

export default defineConfig({
    output: 'server',
    adapter: vercel(),
    integrations: [react(), tailwind()],
    vite: {
        // Causes clients not to get hydrated
        // Still on the search for a way to enable HMR
        // plugins: [reactRefresh()],
        resolve: {
            alias: {
                '.prisma/client/edge': './node_modules/.prisma/client/edge.js',
            },
        },
    },
});
