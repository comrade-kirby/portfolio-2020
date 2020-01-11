<script>
	import { spring, tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing';

	let mouse = spring({ x: 0, y: 0 }, {
		stiffness: 0.00001,
		damping: .001
	})

	let canvasWidth
	let canvasHeight
	let backgroundHue = tweened(180, {
		duration: 50000,
		easing: cubicOut
	})
	let forgroundHue = tweened(180, {
		duration: 1000,
		easing: cubicOut
	})

	const hueMaxValue = 360
	const lightness = "90%"

	const handleMouseMove = (e) => {
		mouse.set({ x: e.clientX, y: e.clientY })
	
		backgroundHue.set(hueMaxValue * $mouse.x / canvasWidth)
		forgroundHue.set(hueMaxValue * $mouse.y / canvasHeight)
	}
</script>

<style>
	div { width: 100%; height: 100% }
	svg { width: 100%; height: 100%; background-color: hsl(var(--backgroundHue), 50%, var(--lightness)); }
	circle { fill: hsl(var(--forgroundHue), 50%, var(--lightness)); }
</style>

<div
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
>
	<svg
		style="--backgroundHue:{$backgroundHue}; --lightness:{lightness}"
		on:mousemove="{handleMouseMove}"
	>
		<circle style="--forgroundHue:{$forgroundHue}; --lightness:{lightness}" cx={$mouse.x} cy={$mouse.y} r={1000} />
	</svg>
</div>