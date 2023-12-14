// rules
import { namingConvention } from './.stylelint.rules.mjs';
import { a11y, canIuse, possibleErrors, unknownThings } from './.stylelint.plugins.mjs'

/* @see https://stylelint.io/user-guide/configure */
const config = {
  extends: [
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
  ],
  plugins: [
    '@double-great/stylelint-a11y',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-declaration-strict-value',
    'stylelint-no-unsupported-browser-features',
    'stylelint-plugin-defensive-css',
    'stylelint-value-no-unknown-custom-properties',
  ],
  // overrides: [
  // {
  // files: ['*.svelte', '**/*.svelte'],
  // customSyntax: 'postcss-html',
  // extends: ['stylelint-config-html/svelte'],
  // },
  // ],
  rules: {
    // -- rulesFromStylelint --
    ...namingConvention,
    // -- rulesFromPlugins --
    ...a11y,
    ...canIuse,
    ...possibleErrors,
    ...unknownThings
  },
};

export default config;