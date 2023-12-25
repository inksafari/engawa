// -- rulesFromPlugins --
const a11y = {
  // plugin: @double-great/stylelint-a11y
  // https://github.com/double-great/stylelint-a11y
  'a11y/font-size-is-readable': [true, { severity: 'warning' }],
  'a11y/no-spread-text': [true, { severity: 'warning' }],
  'a11y/no-obsolete-attribute': [true, { severity: 'warning' }],
  'a11y/no-obsolete-element': [true, { severity: 'warning' }],
  'a11y/no-outline-none': [true, { severity: 'warning' }],
  'a11y/no-text-align-justify': [true, { severity: 'error' }],
  'a11y/selector-pseudo-class-focus': [true, { severity: 'warning' }],
}

const canIuse = {
  // plugin: stylelint-no-unsupported-browser-features
  // https://github.com/RJWadley/stylelint-no-unsupported-browser-features
  'plugin/no-unsupported-browser-features': [true, { severity: 'warning' }],
  // plugin: stylelint-csstree-validator
  // https://github.com/csstree/stylelint-validator
}

const possibleErrors = {
  // plugin: stylelint-declaration-block-no-ignored-properties
  // https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties
  'plugin/declaration-block-no-ignored-properties': true,
  // plugin: Defensive CSS ( https://defensivecss.dev/tips )
  'plugin/use-defensive-css': [
    true,
    // {
    // 'custom-property-fallbacks': [ true, {
    // 'ignore': [
    // Ignore all custom properties that don't contain `--yan-`.
    // ^((?!\( *?--yan-).)*$/
    // ]
    // }
    {
      'flex-wrapping': true,
    },
    {
      'scroll-chaining': true,
    },
    {
      'vendor-prefix-grouping': true,
    },
  ],
}

const unknownThings = {
  // plugin: stylelint-value-no-unknown-custom-properties
  // https://github.com/csstools/stylelint-value-no-unknown-custom-properties
  'csstools/value-no-unknown-custom-properties': [
    true,
    {
      importFrom: [
        './src/styles/_tokens.css',
        './src/styles/plugins/codeblock.css',
      ],
    },
  ],
  // plugin: stylelint-declaration-strict-value
  // https://github.com/AndyOGo/stylelint-declaration-strict-value
  'scale-unlimited/declaration-strict-value': [
    [
      '/color/',
      // '/size/',
      // '/margin/',
      // '/padding/',
      'background-color',
      'background-image',
      'z-index',
    ],
    {
      ignoreKeywords: {
        '': ['inherit'],
        'background-color': ['currentColor', 'transparent', 'inherit'],
        'background-image': ['100%', 'auto'],
        '/color/': [
          'currentColor',
          'inherit',
          'initial',
          'transparent',
          'unset',
        ],
      },
      expandShorthand: true,
      recurseLonghand: true,
      message: 'Custom expected ${types} for "${value}" of "${property}"',
      disableFix: true,
    },
  ],
}

export { a11y, canIuse, possibleErrors, unknownThings }
