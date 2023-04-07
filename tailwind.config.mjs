import forms from '@tailwindcss/forms';
// import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,vue}'],
    theme: {
        fontFamily: {
            sans: [
                '-apple-system',
                'BlinkMacSystemFont',
                'avenir next',
                'avenir',
                'segoe ui',
                'helvetica neue',
                'helvetica',
                'Cantarell',
                'Ubuntu',
                'roboto',
                'noto',
                'arial',
                'sans-serif',
            ],
            serif: [
                '-apple-system-ui-serif',
                'ui-serif',
                'Georgia',
                'Iowan Old Style',
                'Apple Garamond',
                'Baskerville',
                'Times New Roman',
                'Droid Serif',
                'Times',
                'Source Serif Pro',
                'serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
            ],
            mono: [
                'ui-monospace',
                'SFMono-Regular',
                'Andale Mono',
                'Ubuntu Mono',
                'Menlo',
                'Consolas',
                'Monaco',
                'Liberation Mono',
                'Lucida Console',
                'monospace',
            ],
        },
    },
    plugins: [forms()],
    darkMode: 'media',
};
