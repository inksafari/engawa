<script lang="ts">
  // source:
  // https://github.com/Jkuzz/jkuzz.github.io/blob/master/src/components/EmailDisplay.svelte
  // https://jkuzz.github.io/
  let emailText = 'javascript:void(0)'
  let anchor: HTMLAnchorElement

  // FIXME: 更換電子信箱地址
  // 編碼指令：echo -n 'me@example.org' | base64
  // 解碼指令：echo -n 'bWVAZXhhbXBsZS5vcmc=' | base64 --decode
  window.setTimeout(() => {
    anchor.attributes.removeNamedItem('aria-disabled')
    emailText = 'mailto:' + atob('bWVAZXhhbXBsZS5vcmc=')
  }, 5000)
</script>

<a href={emailText} class="me" bind:this={anchor} aria-disabled="true">
  contact
</a>
