/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="svelte" />

// https://vitejs.dev/guide/env-and-mode#intellisense-for-typescript
type ImportMetaEnv = {
  readonly VITE_SITE_DOMAIN: string
  readonly VITE_SITE_URL: string
  readonly VITE_SITE_PORT: number
  readonly VITE_WEBMENTION_URL: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}
