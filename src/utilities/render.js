// https://github.com/sushi-chaaaan/sushichan.live/blob/main/src/utils/html.ts
import {
  // loadDefaultJapaneseParser,
  // loadDefaultSimplifiedChineseParser,
  loadDefaultTraditionalChineseParser,
} from 'budoux'
import sanitizeHtml from 'sanitize-html'

// demo: https://google.github.io/budoux/?lang=zh-hant
const zhtParser = loadDefaultTraditionalChineseParser()

function applyBudouXToHTML(rawHtml) {
  const html = sanitizeHtml(rawHtml)
  const result = zhtParser.translateHTMLString(html)
  return result
}

export { applyBudouXToHTML }
