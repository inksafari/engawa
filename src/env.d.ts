/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="svelte" />
import type { isTypeNode, isTypeOfExpression } from 'typescript'

declare module '@pagefind/default-ui' {
  class PagefindUi {
    constructor(options: {
      element?: string | HTMLElement
      bundlePath?: string
      pageSize?: number
      resetStyles?: boolean
      showImages?: boolean
      showSubResults?: boolean
      excerptLength?: number
      processResult?: any
      processTerm?: any
      showEmptyFilters?: boolean
      debounceTimeoutMs?: number
      mergeIndex?: any
      translations?: any
      autofocus?: boolean
      sort?: any
    })
  }
}

// https://vitejs.dev/guide/env-and-mode#intellisense-for-typescript
// https://github.com/withastro/roadmap/discussions/590#discussioncomment-7535686
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
type ImportMetaEnv = {
  readonly VITE_SITE_DOMAIN: string
  readonly VITE_SITE_URL: string
  readonly VITE_SITE_PORT: number
  readonly VITE_SITE_IMAGE_CDN: string
  readonly VITE_WEBMENTION_URL: string
  // readonly VITE_WEBMENTION_API_KEY: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}
