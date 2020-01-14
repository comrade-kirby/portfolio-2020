<script>
	import p5 from "p5"
	import { onMount } from "svelte"
	
	export let sketch

	onMount(() => {
	  new p5(sketch)
	})
</script>

<style>
</style> 