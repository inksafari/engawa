import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import remarkDirective from 'remark-directive'
import remarkExpressiveCode from 'remark-expressive-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRuby from './remark-ruby.js'
// import remarkModifiedTime from './remark-update.js'
import { remarkExpressiveCodeOptions } from './remark.options.js'

export const remarkPlugins = [
  remarkGfm,
  remarkDirective,
  [
    remarkRuby,
    {
      separator: ';',
    },
  ],
  [remarkExpressiveCode, remarkExpressiveCodeOptions],
  remarkA11yEmoji,
  remarkMath,
  // remarkModifiedTime,
]
