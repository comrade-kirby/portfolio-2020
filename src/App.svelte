<script>
	import { afterUpdate } from 'svelte'

	import Background from './Background.svelte'
	import Home from './Home.svelte'
	import About from './About.svelte'
	import { screenHeight, screenWidth, longestScreenDimension, circleLocation } from './stores.js'

	let canvasHeight
	let canvasWidth

	const handleMouseMove = (e) => {
    circleLocation.set({ x: e.clientX, y: e.clientY })
  }

	afterUpdate(() => {
		screenHeight.set(canvasHeight)	 
		screenWidth.set(canvasWidth)	 

		const longestDimension = $screenWidth >= $screenHeight ? $screenWidth : $screenHeight
		longestScreenDimension.set(longestDimension)
	})
</script>

<style>
	div {
		height: 100%;
		width: 100%;
	}
</style>

<div 
	class='index-container'
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
	on:mousemove={handleMouseMove}
>
	<Home />
	<About />
	<Background />
</div>