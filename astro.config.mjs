import { defineConfig, passthroughImageService } from 'astro/config'
// import cloudflare from '@astrojs/cloudflare'
/* --- Integrations ( https://astro.build/integrations ) --- */
import mdx from '@astrojs/mdx'
import svelte from '@astrojs/svelte'
import swup from '@swup/astro'
import icon from 'astro-icon'
import {
  // developmentIntegrations,
  productionIntegrations,
} from './src/plugins/plugins.js'
/* -- Configuration -- */
import {
  astroIconOptions,
  markdownOptions,
} from './src/plugins/plugins.config.js'
/* -- Environment Variables -- */
import siteInfo, { isProduction } from './src/consts'
// import siteInfo from './src/consts'

const baseConfig = {
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
    port: Number.parseInt(siteInfo.port || 8081),
  },
  trailingSlash: 'ignore',
  /* https://docs.astro.build/en/reference/configuration-reference/#image-options */
  /* https://docs.astro.build/en/guides/images/#configure-no-op-passthrough-service */
  /* https://docs.astro.build/en/guides/images/#using-sharp */
  /* https://github.com/Princesseuh/erika.florist/blob/main/src/imageService.ts */
  image: {
    service: passthroughImageService(),
  },
  // platformProxy: {
  // enabled: true,
  // },
  // }),
  /* https://docs.astro.build/en/guides/prefetch/ */
  prefetch: {
    defaultStrategy: 'viewport',
  },
  compressHTML: false,
  css: {
    transformer: 'lightningcss',
  },
  build: {
    // cssMinify: 'lightningcss',
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
    //...(isProduction
    //? productionIntegrations
    //: developmentIntegrations
    //)
  ],
  security: { checkOrigin: true },
  // https://astro.build/blog/astro-460/#experimental-support-for-csrf-protection
  experimental: {
    security: {
      csrfProtection: {
        origin: true,
      },
    },
  },
}
// isProduction && baseConfig.integrations.push(...productionIntegrations)
baseConfig.integrations.push(...productionIntegrations)

// https://astro.build/config
export default defineConfig(baseConfig)
