/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="svelte" />

declare module '@pagefind/default-ui' {
  class PagefindUI {
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
type ImportMetaEnv = {
  readonly VITE_SITE_DOMAIN: string
  readonly VITE_SITE_URL: string
  readonly VITE_SITE_PORT: number
  readonly VITE_WEBMENTION_URL: string
  // readonly WEBMENTION_API_KEY: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}
