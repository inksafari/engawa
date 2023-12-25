// EXAMPLE USAGE:
// echo 'Updated package dependencies' | pnpx commitlint
const config = {
  extends: ['@commitlint/config-conventional'],
  // @see: https://commitlint.js.org/#/reference-rules
  rules: {
    'body-max-line-length': [1, 'always', 72], // [2, 'always', 120],
    'footer-max-line-length': [1, 'always', 72], // [2, 'always', 120],
    'header-max-length': [1, 'always', 50], // [2, 'always', 72],
  },
}

export default config
