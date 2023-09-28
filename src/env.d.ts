/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="svelte" />

interface ImportMetaEnv {
  readonly VITE_SITE_DOMAIN: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_SITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
