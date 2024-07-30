// import node from '@astrojs/node'
import { defineConfig } from 'astro/config'
/* --- Integrations ( https://astro.build/integrations ) --- */
import mdx from '@astrojs/mdx'
import svelte from '@astrojs/svelte'
import swup from '@swup/astro'
import icon from 'astro-icon'
import devtoolBreakpoints from 'astro-devtool-breakpoints'
import metaTags from 'astro-meta-tags'
/* -- Environment Variables -- */
import siteInfo from './src/consts'
// import sentry from '@sentry/astro'
// import spotlightjs from '@spotlightjs/astro'
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
  },
  site: siteInfo.siteBase,
  server: {
    port: Number.parseInt(siteInfo.port),
  },
  output: 'server',
  trailingSlash: 'ignore',
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
    devtoolBreakpoints(),
    metaTags(),
    // sentry(),
    // spotlightjs(),
  ],
  redirects: {
    '/feed': '/rss',
    '/feeds': '/rss',
  },
  security: { checkOrigin: true },
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

export default defineConfig(developmentConfig)
