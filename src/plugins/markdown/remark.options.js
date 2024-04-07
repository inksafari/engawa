import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

/** @type {import('remark-expressive-code').RemarkExpressiveCodeOptions} */
const remarkExpressiveCodeOptions = {
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
  },
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
}

export { remarkExpressiveCodeOptions }
