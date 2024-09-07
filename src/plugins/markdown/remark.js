// import path from 'node:path'
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import remarkCallout from 'remark-callout'
import remarkDirective from 'remark-directive'
import remarkExpressiveCode from 'remark-expressive-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
// import { getPermalinks, remarkWikiLink } from '@portaljs/remark-wiki-link'
import remarkRuby from './remark-ruby.js'
// import remarkUnwrapImages from 'remark-unwrap-images'
// import remarkModifiedTime from './remark-update.js'
import { remarkExpressiveCodeOptions } from './remark.options.js'
// import { slugifier } from '../../utilities/getPermaLink.js'

// const BLOG_DIR = 'src/content/posts'
// https://github.com/zestedesavoir/zmarkdown/tree/master?tab=readme-ov-file#packages
export const remarkPlugins = [
  remarkA11yEmoji,
  // https://www.npmjs.com/package/remark-callout
  remarkCallout,
  remarkGfm,
  [remarkExpressiveCode, remarkExpressiveCodeOptions],
  remarkMath,
  // remarkUnwrapImages,
  // remarkModifiedTime,
  // https://astro-digital-garden.stereobooster.com/recipes/braindb/
  // https://github.com/datopian/datahub/blob/main/packages/remark-wiki-link/README.md
  // https://github.com/datopian/datahub/issues/1059
  // [
  //remarkWikiLink,
  //{
  //pathFormat: 'obsidian-short',
  //permalinks: getPermalinks(BLOG_DIR),
  //hrefTemplate: (permalink) =>
  //path.join('/blog', slugifier(permalink)),
  //},
  //],
  remarkDirective,
  [
    remarkRuby,
    {
      separator: ';',
    },
  ],
]
