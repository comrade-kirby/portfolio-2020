<script>
	import { spring, tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing';

	let mouse = spring({ x: 0, y: 0 }, {
		stiffness: 0.00001,
		damping: .001
	})

	let canvasWidth
	let canvasHeight
	let backgroundHue = tweened(50, {
		duration: 5000,
		easing: cubicOut
	})
	let forgroundHue = tweened(50, {
		duration: 5000,
		easing: cubicOut
	})

	const hueMaxValue = 360

	const handleMouseMove = (e) => {
		mouse.set({ x: e.clientX, y: e.clientY })
	
		backgroundHue.set(hueMaxValue * $mouse.x / canvasWidth)
		forgroundHue.set(hueMaxValue * $mouse.y / canvasHeight)
	}
</script>

<style>
	div { width: 100%; height: 100% }
	svg { width: 100%; height: 100%; background-color: hsl(var(--backgroundHue), 50%, 50%); }
	circle { fill: hsl(var(--forgroundHue), 50%, 50%); }
</style>

<div
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
>
	<svg
		style="--backgroundHue:{$backgroundHue}"
		on:mousemove="{handleMouseMove}"
	>
		<circle style="--forgroundHue:{$forgroundHue}" cx={$mouse.x} cy={$mouse.y} r={500} fill-opacity="50%" />
	</svg>
</div>