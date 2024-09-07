import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

/** @type {import('remark-expressive-code').RemarkExpressiveCodeOptions} */
const remarkExpressiveCodeOptions = {
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  themes: ['material-theme-palenight', 'github-light'],
  themeCssSelector: (theme) => `[data-code-theme="${theme.name}"]`,
  // themeCssSelector(theme) {
  // return `[data-theme='${
  // theme.name === 'github-light' ? 'light' : 'dark'
  // }']`
  // },
  // useThemedScrollbars: false,
  // useThemedSelectionColors: false,
  styleOverrides: {
    // borderRadius: 'var(--border-radius)',
    codeFontFamily: 'var(--font-mono)',
    uiFontFamily: 'var(--font-mono)',
    uiLineHeight: 'inherit',
    codePaddingInline: '1rem',
    // codeFontSize: '0.8rem',
    // uiFontSize: '0.8rem',
    // frames: {
    // frameBoxShadowCssValue: 'var(--box-shadow)',
    // tooltipSuccessBackground: '#e65161',
    // },
  },
  defaultProps: {
    showLineNumbers: false,
    overridesByLang: {
      'js,ts,jsx,tsx,astro,html,css': {
        showLineNumbers: true,
      },
    },
  },
}

export { remarkExpressiveCodeOptions }
