import { defineConfig } from "astro/config";
/* --- Integrations --- */
//import deno from "@astrojs/deno";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import compress from "astro-compress";
/* -- Configuration -- */
import {
  astroExpressiveCodeOptions,
  astroCompressOptions,
  markdownOptions,
} from "./src/plugins/plugins.config.js";
/* -- Environment Variables -- */
import { loadEnv } from "vite";
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
const isProd = import.meta.env.MODE === "production";
const env = loadEnv("", process.cwd(), ["PUBLIC"]);
const SERVER_PORT = env.PUBLIC_SITE_PORT;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
const SITE_URL = env.PUBLIC_SITE_URL;

// https://astro.build/config
const config = {
  //output: "server",
  //adapter: deno({ port: 8081 }),
  site: SITE_URL,
  server: {
    port: parseInt(SERVER_PORT),
    watch: {
      ignored: ["**/{.cache,.github,.husky,dist}/**"],
    },
  },
  integrations: [
    svelte(),
    expressiveCode(astroExpressiveCodeOptions),
    mdx(markdownOptions),
    isBuild && compress(astroCompressOptions),
  ],
  markdown: markdownOptions,
  /* https://docs.astro.build/en/reference/configuration-reference/#image-options */
  /* https://docs.astro.build/en/guides/assets/#using-sharp */
  image: {
    service: {
      entrypoint: "./src/imageService.ts",
      // 沒有cache功能
      // cacheDir: "./.cache/image",
    },
  },
  vite: {
    resolve: {
      alias: {
        "~/": `${process.cwd()}/src/`,
      },
    },
  },
};

export default defineConfig(config);
