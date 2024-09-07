import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import browserslist from 'browserslist'
import { browserslistToTargets as cssBrowserslistToTargets } from 'lightningcss'
import { defineConfig } from 'vitest/config' // import { defineConfig } from 'vite'
// import { FontaineTransform } from 'fontaine'
// import { svelte } from '@sveltejs/vite-plugin-svelte'
// import sslPlugin from '@vitejs/plugin-basic-ssl'

// config
const browserslistConfig = browserslist.loadConfig({ path: process.cwd() })
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://github.com/thuvasooriya/thuvasooriya.github.io/blob/main/astro.config.ts
function rawFonts(ext) {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id)
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        }
      }
    },
  }
}

// https://vitejs.dev/config/
const config = {
  plugins: [
    rawFonts(['.ttf', '.woff']),
    // svelte({ hot: !process.env.VITEST }),
    // or {step, mkcert, https://www.getlocalcert.net/ }
    // 透過step查詢網站數位憑證： step certificate inspect https://smallstep.com
    // sslPlugin(),
    // https://www.hehehai.cn/posts/chinese-web-font-optimize
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
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // '~': path.resolve(__dirname, './src'),
    // alias: { '~/': `${process.cwd()}/src/` },
    // alias: [{ find: '~', replacement: path.resolve(__dirname,'./src') }],
    // alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  optimizeDeps: {
    allowNodeBuiltins: true,
    exclude: [
      'limax',
      // '@resvg/resvg-js'
    ],
  },
  // https://lightningcss.dev/docs.html#with-vite
  // css: {
  // transformer: 'lightningcss',
  // lightningcss: {
  // targets: cssBrowserslistToTargets(browserslistConfig),
  // drafts: {
  // customMedia: true,
  // },
  // cssModules: true,
  // },
  // },
  build: {
    assetsInlineLimit: 10_096,
    rollupOptions: {
      external: ['sharp'],
    },
    // cssMinify: 'lightningcss',
  },
  // ssr: { noExternal: [ 'open-props'],},
  //https://github.com/lewishowles/howles.dev/blob/main/vitest.config.js
  //test: {
  //globals: true,
  //environment: 'jsdom',
  // deps: {
  // inline: ['vitest-canvas-mock'],
  // },
  // setupFiles: 'test/vitest-setup.ts',
  //include: ['test/**/*.{js,ts}'],
  //},
}

/** @type {import('vite').UserConfig} */
export default defineConfig(config)
