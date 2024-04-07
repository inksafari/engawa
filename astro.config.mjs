import { defineConfig } from 'astro/config'
/* --- Integrations ( https://astro.build/integrations ) --- */
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import compress from '@playform/compress'
import { pagefind } from './src/plugins/astro-integrations/pagefind.js'

/* -- Configuration -- */
import {
  astroCompressOptions,
  markdownOptions,
} from './src/plugins/plugins.config.js'

/* -- Environment Variables -- */
import siteInfo from './src/consts'

const baseConfig = {
  site: siteInfo.siteBase,
  server: {
    port: Number.parseInt(siteInfo.port),
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
  integrations: [
    svelte(),
    mdx(markdownOptions),
    compress(astroCompressOptions),
    pagefind(),
  ],
  markdown: markdownOptions,
  // redirects: {
  // '/feed': '/rss',
  // '/feeds': '/rss',
  // },
  /* https://docs.astro.build/en/reference/configuration-reference/#image-options */
  /* https://docs.astro.build/en/guides/assets/#using-sharp */
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
