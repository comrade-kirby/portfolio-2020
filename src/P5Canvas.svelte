<script>
	export let id
	import p5 from "./p5.min"
	import { onMount } from "svelte"
	
	export let sketch

	onMount(() => {
	  let myp5 = new p5(sketch, id)
	})
</script>

<style>
</style> 
