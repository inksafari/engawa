// https://github.com/xojs/xo
module.exports = {
  prettier: true,
  semicolon: false,
  space: true,
  rules: {
    'capitalized-comments': 'off',
    'import/no-anonymous-default-export': 'off',
    'no-warning-comments': 'off',
    // 'unicorn/filename-case': [
    // 'error',
    // {
    // cases: {
    // pascalCase: true,
    // camelCase: true,
    // },
    // },
    // ],
    'import/extensions': 'off',
    'max-params': ['error', 2],
  },
  ignores: [
    // 'scripts',
    'src/plugins/markdown/remark-bibliography',
  ],
}
