/* eslint-disable no-unused-vars, no-redeclare */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_DOMAIN: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}