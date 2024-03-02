import { defineConfig } from 'vitest/config' // import { defineConfig } from 'vite'
import browserslist from 'browserslist'
import { browserslistToTargets as CSSBrowserslistToTargets } from 'lightningcss'
// import { FontaineTransform } from 'fontaine'
// import { svelte } from '@sveltejs/vite-plugin-svelte'
// import sslPlugin from '@vitejs/plugin-basic-ssl'
// import path from 'path'

// config
const browserslistConfig = browserslist.loadConfig({ path: process.cwd() })

// https://vitejs.dev/config/
const config = {
  plugins: [
    // svelte({ hot: !process.env.VITEST }),
    // or {step, mkcert, https://www.getlocalcert.net/ }
    // 透過step查詢網站數位憑證： step certificate inspect https://smallstep.com
    // sslPlugin(),
    // FontaineTransform.vite({
    // avoid flash of unstyled text by interjecting fallback system fonts
    // https://developer.chrome.com/blog/framework-tools-font-fallback/#using-fontaine-library
    // fallbacks: [
    // '-apple-system',
    // 'Segoe UI',
    // 'Roboto',
    // 'Helvetica Neue',
    // 'Arial',
    // ],
    // https://github.com/johannschopplich/bildhauer-volkmar-kuehn.de/blob/main/vite.config.ts
    // resolvePath: (id) =>
    // new URL(`public/assets/fonts/${id}`, import.meta.url),
    // overrideName: (name) => `${name} override`,
    // iosevka is a monospaced font and isn't immediately visible in most cases, so it's fine to skip
    // skipFontFaceGeneration: (font) => font === 'Iosevka',
    // }),
  ],
  server: {
    // https: true,
    watch: {
      ignored: ['**/{.cache,.github,.husky,.unlighthouse,dist}/**'],
    },
  },
  resolve: {
    alias: { '~/': `${process.cwd()}/src/` },
    // Or alias: [{ find: '@', replacement: path.resolve(__dirname,'./src') }],
  },
  optimizeDeps: {
    allowNodeBuiltins: true,
    exclude: [
      'limax',
      //'@resvg/resvg-js'
    ],
  },
  // https://lightningcss.dev/docs.html#with-vite
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: CSSBrowserslistToTargets(browserslistConfig),
      drafts: {
        customMedia: true,
      },
      cssModules: true,
    },
  },
  build: {
    assetsInlineLimit: 10_096,
    cssMinify: 'lightningcss',
    // rollupOptions: {external: [ /* ...*/ ],},
  },
  // ssr: { noExternal: [ 'open-props'],},
  // test: {
  // globals: true,
  // environment: 'jsdom',
  // deps: {
  // inline: ['vitest-canvas-mock'],
  // },
  // setupFiles: './src/tests/vitest/vitest-setup.ts',
  // include: ['src/tests/vitest/**/*.{js,ts}'],
  // },
}

/** @type {import('vite').UserConfig} */
export default defineConfig(config)
