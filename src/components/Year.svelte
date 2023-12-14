<script>
  import { onMount } from 'svelte';
  export let from; //: number | undefined
  const nowDate = new Date().getUTCFullYear();

  // if javascript is enabled, use a dynamic solution
  let to = 2023;
  onMount(() => {
    to = nowDate.toString();
  });
</script>

{!from || to <= from ? to : `${from}-${to}`}
