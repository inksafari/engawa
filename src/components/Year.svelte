<script>
  import spacetime from 'spacetime'
  import { SITE_TZ } from '~/consts'
  export let from //: number | undefined

  // new Date().getUTCFullYear()
  let nowDate = spacetime.now().goto(SITE_TZ).goto(null).year()
  let to = Number(nowDate) ? nowDate : 2024
</script>

{!from || to <= from ? to : `${from}-${to}`}
