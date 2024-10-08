// 引入腳本在 src/components/Critical.astro
function initHan() {
  // @link: https://hanzi.pro/manual/js-api
  // @demo: https://ethantw.github.io/Han/latest/
  Han(document.querySelector('.han-init'))
    .initCond() // 初始化
    //.renderElem()           // 字級語意元素樣式標準化
    //.renderRuby()           // 渲染行間注元素
    //.renderDecoLine()       // 渲染文字裝飾線元素
    //.renderEm()             // 渲染強調元素
    //.renderHanging()        // 渲染行尾點號懸掛
    .renderJiya() // 渲染標點擠壓
    .renderHWS() // 渲染漢字西文混排間隙
  //.correctBasicBD()         // 修正基本標點符號
  //.substCombLigaWithPUA()   // 以PUA字元取代合字符
}

function initHeti() {
  // @link: https://github.com/sivan/heti
  // @demo: https://sivan.github.io/heti/
  const heti = new Heti('.heti')
  heti.autoSpacing()
}

export { initHan, initHeti }
