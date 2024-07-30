import { toString as _toString } from 'mdast-util-to-string'
// yoinked from here:
// https://codeberg.org/kamov/kamoshi.org/src/branch/main/src/utils/remark/ruby.
// demo: https://kamoshi.org/posts/ruby-in-markdown/
// usage: {日本語}(にほんご)の{文法}(ぶんぽう)は{難}(むずか)しい
import { CONTINUE, SKIP, visit } from 'unist-util-visit'

function toHtml([text, help]) {
  return `<ruby>${text}<rp>(</rp><rt>${help}</rt><rp>)</rp></ruby>`
}

function createRuby(text, help, options) {
  const splitText = text.split('')
  const splitHelp = help.split(options?.separator || ';')

  const pairs =
    splitText.length === splitHelp.length
      ? splitText.map((e, i) => [e, splitHelp[i]])
      : [[text, help]]

  return pairs.map(toHtml).join('')
}

export const remarkRuby = (options) => {
  return (tree) => {
    visit(tree, 'textDirective', (node, index, parent) => {
      if (node.name !== 'ruby') {
        return CONTINUE
      }

      const text = _toString(node)
      const help = node.attributes?.help
      const ruby = {
        type: 'html',
        value: createRuby(text, help, options),
        position: node.position,
      }

      parent.children.splice(index, 1, ruby)
      return SKIP
    })
  }
}

export default remarkRuby
