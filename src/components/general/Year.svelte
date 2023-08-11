<script>
	import { onMount } from "svelte"
	export let from //: number | undefined
	// if javascript is enabled, use a dynamic solution
	let to = 2023
	onMount(() => {
		to = new Date().getFullYear()
	})
</script>

{(!from || to <= from) ? to.toString() : `${from}-${to}`}
