const path = require('node:path')
const postcssJitProp = require('postcss-jit-props')
const pkgConfig = require('./package.json')
// const postcssLightingCSS = require('postcss-lightningcss')
// const postcssPurgecss = require('@fullhuman/postcss-purgecss')

// https://open-props.style/
const openpropsOptions = {
  files: [path.resolve(__dirname, 'src/styles/vendor/open-props.min.css')],
}

// https://lightningcss.dev/
const lightingcssOptions = {
  browsers: pkgConfig.browserslist,
  lightningcssOptions: {
    minify: false, // process.env.MODE === 'production' ? true : false,
    sourceMap: false,
    cssModules: true,
  },
}

// https://cssnano.github.io/cssnano/docs/what-are-optimisations/
/* ... */

// https://purgecss.com/
const purgecssOptions = {
  fontFace: true,
  variables: true,
  rejected: true,
  keyframes: false, // needed false for transitions
  safelist: {
    // purgecss falsely purges some css
    standard: [
      /:lang/,
      // https://github.com/FullHuman/purgecss/issues/1153
      /:hover/,
      // https://github.com/FullHuman/purgecss/issues/978
      /:where/,
      /:is/,
      // https://github.com/FullHuman/purgecss/issues/1197
      /:not/,
      // https://github.com/FullHuman/purgecss/issues/1215
      /:has/,
    ],
    // needed for transitions
    greedy: [
      /*astro*/
    ],
  },
  content: [process.cwd() + '/src/**/*.{astro,svelte,html,css}'],
  //extractors: [
  //{
  //extractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
  //extensions: ['astro', 'html', 'css'],
  //},
  //],
}

/**
 * @file PostCSS Configuration
 * @see https://github.com/postcss/postcss
 */
module.exports = {
  plugins: [
    postcssJitProp(openpropsOptions),
    ...(process.env.MODE === 'production'
      ? [
          // FIXME: Grid.css不能用
          //postcssLightingCSS(lightingcssOptions),
          // FIXME: :lang
          //postcssPurgecss(purgecssOptions),
        ]
      : []),
  ],
}
