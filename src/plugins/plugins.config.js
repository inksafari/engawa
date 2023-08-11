import { remarkPlugins } from "./markdown/remark.js";
import { rehypePlugins } from "./markdown/rehype.js";

const markdownOptions = {
  remarkPlugins,
  rehypePlugins,
};

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  /* https://github.com/expressive-code/expressive-code/blob/main/packages/astro-expressive-code/README.md#theme */
  theme: "rose-pine-dawn",
  // https://github.com/yq612/astro-paper-plus/blob/main/src/utils/expressive-code.ts
  // https://github.com/Princesseuh/erika.florist/blob/main/astro.config.ts
  // ...
};

/* https://github.com/astro-community/astro-compress/tree/main/Source/Option */
const astroCompressOptions = {
  logger: 0,
  css: { comments: true },
  js: true,
  html: true,
  img: false,
  svg: false,
};

export { astroExpressiveCodeOptions, astroCompressOptions, markdownOptions };
