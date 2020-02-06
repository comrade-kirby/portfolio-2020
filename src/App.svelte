<script>
	import { afterUpdate } from 'svelte'

	import Background from './Background.svelte'
	import Main from './Main.svelte'
	import About from './About.svelte'
	import { logStiffness, logDamping } from './helpers.js'
	import { screenHeight,
		screenWidth,
		longestScreenDimension,
		circleLocation,
		scrollPosition,
		pullValue,
		momentumValue
	} from './stores.js'

	let canvasHeight
	let canvasWidth
	let scroll
	const handleMouseMove = (e) => {
		circleLocation.set({ x: e.clientX, y: e.clientY })
		circleLocation.stiffness = logStiffness($pullValue)
		circleLocation.damping = logDamping($momentumValue)
  }

	afterUpdate(() => {
		screenHeight.set(canvasHeight)	 
		screenWidth.set(canvasWidth)	 
		scrollPosition.set(scroll)

		const longestDimension = $screenWidth >= $screenHeight ? $screenWidth : $screenHeight
		longestScreenDimension.set(longestDimension)
	})
</script>

<style>
	:global(body) {
		padding: 0;
	}
	div {
		height: 100%;
		width: 100%;
	}
</style>

<svelte:window bind:scrollY={scroll}/>
<div 
	class='index-container'
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
	on:mousemove={handleMouseMove}
>
	<Main />
	<Background />
</div>