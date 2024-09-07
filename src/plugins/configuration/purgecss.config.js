// https://purgecss.com/
export const astroPurgecssOptions = {
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
