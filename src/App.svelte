<script>
	import { afterUpdate } from 'svelte'

	import Background from './Background/Background.svelte'
	import Main from './Main/Main.svelte'
	import SidePanel from './SidePanel/SidePanel.svelte'
	import Loader from './Loader/Loader.svelte'

	import { 
		frequencyInterval,
		frequencyValue,
		circleLocation,
		longestScreenDimension,
		mobileLayout,
		open,
		screenHeight,
		screenWidth,
		smallDimensions
	} from './stores.js'

	let canvasHeight
	let canvasWidth
	let loaded = false
 
	window.onload = (event) => {
		loaded = true
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

	:global(button) {
		cursor: pointer;
	}

	div {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
    overflow: hidden;
	}

	
</style>

<div 
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}

>
	{#if loaded}
		{#if $open}
			<Main />
		{/if}
		{#if !$mobileLayout || !$open}
			<SidePanel />
		{/if}
		<Background />
	{/if}
	<Loader loaded={loaded}/>
</div>