/* https://github.com/Playform/Compress */
export const astroCompressOptions = {
  // Logger: 0,
  // CSS: { comments: true },
  CSS: false,
  HTML: {
    'html-minifier-terser': {
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: false,
      sortClassName: false,
    },
  },
  Image: false,
  JavaScript: false,
  SVG: false,
}
