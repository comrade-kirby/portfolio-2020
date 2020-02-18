<script>
	import { afterUpdate } from 'svelte'

	import Background from './Background.svelte'
	import Main from './Main.svelte'
	import About from './About.svelte'
	import { logStiffness, logDamping } from './helpers.js'
	import { 
		circleLocation,
		longestScreenDimension,
		mobileLayout,
		pullValue,
		screenHeight,
		screenWidth,
		smallDimensions
	} from './stores.js'

	let canvasHeight
	let canvasWidth
	
	const handleMouseMove = (e) => {
		circleLocation.set({ x: e.clientX, y: e.clientY })
		circleLocation.stiffness = logStiffness($pullValue)
		circleLocation.damping = logDamping($pullValue)
  }

	afterUpdate(() => {
		screenHeight.set(canvasHeight)	 
		screenWidth.set(canvasWidth)	 
		canvasWidth < 1000 ? mobileLayout.set(true) : mobileLayout.set(false)
		canvasWidth < 750 ? smallDimensions.set(true) : smallDimensions.set(false)

		const longestDimension = $screenWidth >= $screenHeight ? $screenWidth : $screenHeight
		longestScreenDimension.set(longestDimension)
	})
</script>

<style>
	:global(*) {
		font-family: 'Major Mono Display', monospace;
	}
	
	:global(body) {
		padding: 0;
	}

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
	<Main />
	<Background />
</div>