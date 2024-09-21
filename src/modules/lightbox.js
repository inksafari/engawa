import mediumZoom from 'medium-zoom/dist/pure'

export function initMediumZoom() {
  const selector = '[data-zoomable]'
  mediumZoom(selector, {
    margin: 24,
    background: 'rgb(32, 32, 32, 0.8)', //'rgb(var(--color-fill) / .9)',
  })
}
// 其他選擇：
// https://github.com/sparanoid/lightense-images
// https://github.com/miloxeon/fast-image-zoom
// https://www.cssscript.com/categories/zoom/
