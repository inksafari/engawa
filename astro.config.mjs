import { defineConfig } from 'astro/config'
/* --- Integrations ( https://astro.build/integrations ) --- */
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import compress from 'astro-compress'

/* -- Configuration -- */
import {
  astroCompressOptions,
  markdownOptions,
} from './src/plugins/plugins.config.js'
/* -- Environment Variables -- */
import { SERVER_PORT, SITE_URL } from '~/consts'

// https://astro.build/config
const baseConfig = {
  site: SITE_URL,
  server: {
    port: Number.parseInt(SERVER_PORT),
  },
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
    compress(astroCompressOptions),
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
}

// isProd && { baseConfig.integrations.push(serviceWorker()) }

export default defineConfig(baseConfig)
