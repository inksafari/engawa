// demo: https://google.github.io/budoux/?lang=zh-hant
import {
  // loadDefaultJapaneseParser,
  // loadDefaultSimplifiedChineseParser,
  loadDefaultTraditionalChineseParser,
} from 'budoux'
// import sanitizeHtml from 'sanitize-html'

// https://github.com/sushi-chaaaan/sushichan.live/blob/main/src/utils/html.ts
// function applyBudouXToHTML(rawHtml) {
// const zhtParser = loadDefaultTraditionalChineseParser()
// const html = sanitizeHtml(rawHtml)
// const result = zhtParser.translateHTMLString(html)
// return result
// }

// https://github.com/kissge/monolog/blob/master/src/lib/server/services/segment.ts
export class SegmentService {
  protected zhtParser = loadDefaultTraditionalChineseParser()

  segment(text: string) {
    const segments = this.zhtParser.parse(text)
    for (let i = segments.length - 1; i > 0; --i) {
      if (
        ['）', '？'].includes(segments[i]) ||
        ['（', ' (', '「'].includes(segments[i - 1]) ||
        (/^[\w:;,.!?]/.test(segments[i]) && /[\w(]$/.test(segments[i - 1]))
      ) {
        segments[i - 1] += segments[i]
        segments.splice(i, 1)
      }
    }

    return segments
  }
}

export default new SegmentService()
