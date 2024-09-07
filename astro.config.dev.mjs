import { defineConfig, passthroughImageService } from 'astro/config'
/* --- Integrations ( https://astro.build/integrations ) --- */
import mdx from '@astrojs/mdx'
import svelte from '@astrojs/svelte'
import swup from '@swup/astro'
import icon from 'astro-icon'
import { developmentIntegrations } from './src/plugins/plugins.js'
/* -- Environment Variables -- */
import siteInfo from './src/consts'
/* -- Configuration -- */
import {
  astroIconOptions,
  markdownOptions,
} from './src/plugins/plugins.config.js'

const developmentConfig = {
  redirects: {
    '/': {
      status: 307,
      destination: '/blog',
    },
    '/feed': '/rss',
    '/feeds': '/rss',
  },
  site: siteInfo.siteBase,
  server: {
    port: Number.parseInt(siteInfo.port),
  },
  output: 'server',
  trailingSlash: 'ignore',
  /* https://docs.astro.build/en/reference/configuration-reference/#image-options */
  /* https://docs.astro.build/en/guides/images/#configure-no-op-passthrough-service */
  /* https://docs.astro.build/en/guides/images/#using-sharp */
  /* https://github.com/Princesseuh/erika.florist/blob/main/src/imageService.ts */
  image: {
    service: passthroughImageService(),
  },
  /* https://docs.astro.build/en/guides/prefetch/ */
  prefetch: {
    defaultStrategy: 'viewport',
  },
  compressHTML: false,
  build: {
    inlineStylesheets: 'always',
  },
  scopedStyleStrategy: 'attribute',
  markdown: markdownOptions,
  integrations: [
    icon(astroIconOptions),
    svelte(),
    swup({
      accessibility: true,
      progress: true,
      smoothScrolling: true,
    }),
    mdx(markdownOptions),
    ...developmentIntegrations,
  ],
  security: { checkOrigin: true },
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

export default defineConfig(developmentConfig)
