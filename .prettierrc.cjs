// Biome( biomejs.dev )不支援CSS、Svelte和Astro
/** @type {import('prettier').Config} */
module.exports = {
  plugins: [
    require.resolve('prettier-plugin-astro'),
    require.resolve('prettier-plugin-svelte'),
  ],
  bracketSpacing: true,
  endOfLine: 'lf',
  singleQuote: true,
  jsxSingleQuote: true,
  useTabs: false,
  tabWidth: 2,
 // semi: false,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.css', //['*.{css,sass,scss}'],
      options: {
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
};