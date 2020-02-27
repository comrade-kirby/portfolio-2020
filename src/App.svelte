<script>
	import { afterUpdate } from 'svelte'

	import Background from './Background/Background.svelte'
	import Main from './Main/Main.svelte'
	import SidePanel from './SidePanel/SidePanel.svelte'
	import Loader from './Loader/Loader.svelte'

	import { 
		active,
		longestScreenDimension,
		mobileLayout,
		open,
		reset,
		screenHeight,
		screenWidth,
		screenSize,
		touch
	} from './stores.js'

	let canvasHeight
	let canvasWidth
	let loaded = false
 
	window.onload = (event) => {
		loaded = true
	}

	const handleKeydown = (e) => {
		if (!$open) {
			if (e.code == "KeyR") { reset.set(true) }
		}
	}
	
	const touched = () => {
		touch.set(true)
	}
	
	afterUpdate(() => {
		screenHeight.set(canvasHeight)	 
		screenWidth.set(canvasWidth)	 
		canvasWidth < 1000 ? mobileLayout.set(true) : mobileLayout.set(false)
		if (canvasWidth < 650) { screenSize.set('small') }
		else if (canvasWidth < 750) { screenSize.set('medium') }
		else { screenSize.set('large') }

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

  :global(button::-moz-focus-inner) {
		border: 0;
	}
	
	:global(.screen-reader-content) {
		position:absolute;
		left:-10000px;
		top:auto;
		width:1px;
		height:1px;
		overflow:hidden;
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

<svelte:window 
	on:keydown={handleKeydown}
	on:touchstart|once={touched}
	on:blur={() => {active.set(false)}}
	on:focus={() => {active.set(true)}}
	/>
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