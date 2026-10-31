// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeImageCaptions from './src/plugins/rehype-image-captions.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://math.nitnc.club',
  integrations: [react(), mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeImageCaptions],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
