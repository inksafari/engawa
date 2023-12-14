/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="svelte" />

type ImportMetaEnv = {
  readonly VITE_SITE_DOMAIN: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_SITE_PORT: number;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
