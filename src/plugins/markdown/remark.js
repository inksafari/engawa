import remarkDirective from 'remark-directive'
import remarkExpressiveCode from 'remark-expressive-code'
import remarkMath from 'remark-math'

export const remarkPlugins = [
  remarkDirective,
  [
    remarkExpressiveCode,
    {
      themes: ['material-theme-palenight', 'github-light'],
      // themeCssSelector(theme) {
      // return `[data-theme='${
      // theme.name === 'github-light' ? 'light' : 'dark'
      // }']`
      // },
    },
  ],
  remarkMath,
]
