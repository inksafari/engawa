/* https://github.com/infinity-ooo/astro-theme-mia/blob/main/src/pages/posts/%5Bslug%5D.astro */
import { annotate, annotationGroup } from 'rough-notation'

export function initAnnotations() {
  const notions = document.querySelectorAll('span[data-notion-identity]')
  const annotations = new Array(notions.length).fill(0).map((_, index) => {
    const node = notions[index] as HTMLSpanElement
    const type = node.dataset.notionType
    const color = node.dataset.notionColor
    const strokeWidth = node.dataset.notionStrokewidth
    return annotate(node, {
      type: (type as 'underline') ?? 'underline',
      color: color ?? 'red',
      animate: false,
      multiline: type === 'bracket' ? false : true,
      brackets: ['left', 'right'],
      strokeWidth: Number(strokeWidth) ?? 1.5,
    })
  })
  annotationGroup(annotations).show()
}
