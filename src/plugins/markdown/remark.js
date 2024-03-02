import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import remarkDirective from 'remark-directive'
import remarkExpressiveCode from 'remark-expressive-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRuby from './remark-ruby.js'

export const remarkPlugins = [
  remarkGfm,
  remarkDirective,
  [
    remarkRuby,
    {
      separator: ';',
    },
  ],
  [
    remarkExpressiveCode,
    {
      themes: ['material-theme-palenight', 'github-light'],
      // themeCssSelector(theme) {
      // return `[data-theme='${
      // theme.name === 'github-light' ? 'light' : 'dark'
      // }']`
      // },
      styleOverrides: {
        // borderRadius: 'var(--border-radius)',
        uiFontFamily: 'var(--font-mono)',
        codeFontFamily: 'var(--font-mono)',
        // codeFontSize: '0.8rem',
        // frames: {
        // frameBoxShadowCssValue: 'var(--box-shadow)'
        // }
      },
    },
  ],
  remarkA11yEmoji,
  remarkMath,
]
