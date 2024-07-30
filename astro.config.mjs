import { resolve } from 'node:path'
import { defineConfig } from 'astro/config'
// import cloudflare from '@astrojs/cloudflare'
/* --- Integrations ( https://astro.build/integrations ) --- */
import mdx from '@astrojs/mdx'
import svelte from '@astrojs/svelte'
import { shield } from '@kindspells/astro-shield'
import * as playformCompress from '@playform/compress'
import playformInline from '@playform/inline'
import swup from '@swup/astro'
import icon from 'astro-icon'
import purgecss from 'astro-purgecss'
import { pagefind } from './src/plugins/astro-integrations/pagefind.js'

/* -- Configuration -- */
import {
  astroCompressOptions,
  astroIconOptions,
  markdownOptions,
} from './src/plugins/plugins.config.js'
const rootDir = new URL('.', import.meta.url).pathname
const modulePath = resolve(rootDir, '.astro', 'generated_hashes.mjs')

/* -- Environment Variables -- */
import siteInfo from './src/consts'

const baseConfig = {
  redirects: {
    '/': {
      status: 307,
      destination: '/blog',
    },
  },
  site: siteInfo.siteBase,
  server: {
    port: Number.parseInt(siteInfo.port || 8081),
  },
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
  // https://docs.astro.build/en/guides/deploy/cloudflare/
  // output: 'hybrid',
  // image: {
  //  domains: ['inksafari.net', 'content.inksafari.net'],
  // },
  // adapter: cloudflare({
  // imageService: 'cloudflare',
  // runtime: {
  // mode: 'remote', // local
  // },
  // platformProxy: {
  // enabled: true,
  // },
  // }),
  integrations: [
    icon(astroIconOptions),
    svelte(),
    swup({
      accessibility: true,
      progress: true,
      smoothScrolling: true,
    }),
    mdx(markdownOptions),
    pagefind(),
    purgecss({
      fontFace: true,
      keyframes: false,
      rejected: true,
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ['astro', 'html'],
        },
      ],
    }),
    playformCompress.default(astroCompressOptions),
    playformInline(),
    shield({
      sri: {
        hashesModule: modulePath,
      },
    }),
  ],
  security: { checkOrigin: true },
  // redirects: {
  // '/feed': '/rss',
  // '/feeds': '/rss',
  // },
  /* https://docs.astro.build/en/reference/configuration-reference/#image-options */
  /* https://docs.astro.build/en/guides/assets/#using-sharp */
  /* https://github.com/Princesseuh/erika.florist/blob/main/src/imageService.ts */
  // image: {
  // entrypoint: './src/imageService.ts',
  // },
}
// TODO: pagefind
// https://github.com/withastro/starlight/blob/0533ba829648da9f8cdc62b0996328666470a9eb/packages/starlight/index.ts#L90
// https://github.com/shishkin/astro-pagefind/blob/main/packages/astro-pagefind/src/pagefind.ts

// isProd && { baseConfig.integrations.push(serviceWorker()) }

// https://astro.build/config
export default defineConfig(baseConfig)
