<script>
  import spacetime from 'spacetime'
  import siteInfo from '../consts.ts'
  export let from //: number | undefined

  // new Date().getUTCFullYear()
  let nowDate = spacetime.now().goto(siteInfo.tz).goto(null).year()
  let to = Number(nowDate) ? nowDate : 2024
</script>

{!from || to <= from ? to : `${from}-${to}`}
