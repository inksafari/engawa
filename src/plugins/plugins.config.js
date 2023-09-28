import { remarkPlugins } from './markdown/remark.js';
import { rehypePlugins } from './markdown/rehype.js';

const markdownOptions = {
  syntaxHighlight: false,
  remarkPlugins,
  rehypePlugins,
};

/* https://github.com/astro-community/astro-compress/tree/main/Source/Option */
const astroCompressOptions = {
  Logger: 0,
  css: { comments: true },
  js: true,
  html: true,
  img: false,
  svg: false,
};

export { astroCompressOptions, markdownOptions };
