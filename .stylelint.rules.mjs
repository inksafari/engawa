// -- rulesFromStylelint --
const namingConvention = {
  'custom-property-pattern': [
    //'^_?([A-Z][a-z0-9]+)+$|^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    '^(yan--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    {
      // message: 'Expected custom property name to be kebab-case or PascalCase',
      message: (name) => `Expected custom property name '${name}' to be kebab-case with an optional 'yan--' prefix`,
    },
  ]
}

export { namingConvention };