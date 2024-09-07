import { resolve } from 'node:path'
// import devtoolBreakpoints from 'astro-devtool-breakpoints'
import metaTags from 'astro-meta-tags'
import { shield } from '@kindspells/astro-shield'
import * as playformCompress from '@playform/compress'
import pageInsight from 'astro-page-insight'
import playformInline from '@playform/inline'
import purgecss from 'astro-purgecss'
import { pagefind } from './astro-integrations/pagefind.js'
// import tailwindConfigViewer from 'astro-tailwind-config-viewer'

/* -- Configuration -- */
const rootDir = new URL('../..', import.meta.url).pathname
const modulePath = resolve(rootDir, '.astro', 'generated_hashes.mjs')
import { astroCompressOptions, astroPurgecssOptions } from './plugins.config.js'

const developmentIntegrations = [
  // devtoolBreakpoints(),
  purgecss(astroPurgecssOptions),
  metaTags(),
  pageInsight({
    lh: {
      breakPoint: 1024,
    },
    cache: true,
    // firstFetch: 'open',
    // build: {
    // bundle: true,
    // showOnLoad: true,
    // },
  }),
  // tailwindConfigViewer(),
  // sentry(),
  // spotlightjs(),
]

const productionIntegrations = [
  pagefind(),
  purgecss(astroPurgecssOptions),
  playformCompress.default(astroCompressOptions),
  playformInline(),
  shield({
    sri: {
      hashesModule: modulePath,
    },
  }),
]

export { developmentIntegrations, productionIntegrations }
