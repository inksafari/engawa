import { defineConfig } from 'vitest/config';
//import { FontaineTransform } from 'fontaine';
//import { defineConfig } from 'vite';
//import { svelte } from '@sveltejs/vite-plugin-svelte';
//import sslPlugin from '@vitejs/plugin-basic-ssl';
//import path from 'path';

// https://vitejs.dev/config/
const config = {
  plugins: [
    //svelte({ hot: !process.env.VITEST }),
    // or https://www.getlocalcert.net/
    //sslPlugin(),
    //FontaineTransform.vite({
    // avoid flash of unstyled text by interjecting fallback system fonts
    // https://developer.chrome.com/blog/framework-tools-font-fallback/#using-fontaine-library
    //fallbacks: [
    //'-apple-system',
    //'Segoe UI',
    //'Roboto',
    //'Helvetica Neue',
    //'Arial',
    //],
    // https://github.com/johannschopplich/bildhauer-volkmar-kuehn.de/blob/main/vite.config.ts
    //resolvePath: (id) =>
    //new URL(`public/assets/fonts/${id}`, import.meta.url),
    //overrideName: (name) => `${name} override`,
    // iosevka is a monospaced font and isn't immediately visible in most cases, so it's fine to skip
    //skipFontFaceGeneration: (font) => font === 'Iosevka',
    //}),
  ],
  server: {
    //https: true,
    watch: {
      ignored: ['**/{.cache,.github,.husky,.unlighthouse,dist}/**'],
    },
  },
  resolve: {
    alias: { '~/': `${process.cwd()}/src/` },
    //or alias: [{ find: '@', replacement: path.resolve(__dirname,'./src') }],
  },
  optimizeDeps: {
    allowNodeBuiltins: true,
  },
  build: {
    assetsInlineLimit: 10096,
    rollupOptions: {
      external: [
        //'url-join',
        '/pagefind/pagefind.js',
        '/pagefind/pagefind-ui.js',
        '/pagefind/pagefind-ui.css',
      ],
    },
  },
  //ssr: { noExternal: ['open-props'], },
  //test: {
  //globals: true,
  //environment: 'jsdom',
  //deps: {
  //inline: ['vitest-canvas-mock'],
  //},
  //setupFiles: './src/tests/vitest/vitest-setup.ts',
  //include: ['src/tests/vitest/**/*.{js,ts}'],
  //},
};

/** @type {import('vite').UserConfig} */
export default defineConfig(config);
