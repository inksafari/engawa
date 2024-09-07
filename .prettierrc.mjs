/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-svelte'],
  bracketSpacing: true,
  endOfLine: 'lf',
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  semi: false,
  trailingComma: 'all',
  overrides: [
    //{
    //files: '*.css', //['*.{css,sass,scss}'],
    //options: {
    //  singleQuote: false,
    //  trailingComma: 'none',
    //},
    //},
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
}
