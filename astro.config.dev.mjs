import { defineConfig } from 'astro/config'
// import node from '@astrojs/node'
/* --- Integrations ( https://astro.build/integrations ) --- */
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import compress from 'astro-compress'
// import sentry from '@sentry/astro'
// import spotlightjs from '@spotlightjs/astro'
/* -- Configuration -- */
import { markdownOptions } from './src/plugins/plugins.config.js'
/* -- Environment Variables -- */
import { SERVER_PORT, SITE_URL } from '~/consts'

const devConfig = {
  site: SITE_URL,
  server: {
    port: Number.parseInt(SERVER_PORT),
  },
  output: 'server',
  //adapter: node({
  //mode: 'standalone',
  //}),
  trailingSlash: 'never',
  /* https://docs.astro.build/en/guides/prefetch/ */
  prefetch: {
    defaultStrategy: 'viewport',
  },
  compressHTML: false,
  build: {
    inlineStylesheets: 'always',
  },
  scopedStyleStrategy: 'attribute',
  integrations: [
    svelte(),
    mdx(markdownOptions),
    // sentry(),
    // spotlightjs(),
  ],
  markdown: markdownOptions,
  redirects: {
    '/feed': '/rss',
    '/feeds': '/rss',
  },
  /* https://docs.astro.build/en/reference/configuration-reference/#image-options */
  /* https://docs.astro.build/en/guides/assets/#using-sharp */
  // image: {
  // entrypoint: './src/imageService.ts',
  // },
  // vite: {
  // server: {
  // proxy: {
  // '/api': {
  // target: 'http://localhost:9000',
  // For Dev mode, it doesn't work in production
  // changeOrigin: true,
  // rewrite: path => path.replace(/^\/api/, '')
  // }
  // }
  // }
  // }
}

export default defineConfig(devConfig)
