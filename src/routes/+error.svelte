<script>
	import { page } from '$app/stores';
	import Error from '$lib/layouts/Error.svelte';
	// if (dev) console.error($page.error.message)
	// $: ({error, status} = $page)
</script>

<Error page={$page} />
