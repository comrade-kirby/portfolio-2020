<script>
	

	let canvasWidth
	let canvasHeight
	let mouse = { x: 0, y: 0 }
	let hue = 50
	const hueMaxValue = 360

	const handleMouseMove = (e) => {
		mouse.x = e.clientX
		mouse.y = e.clientY

		hue = hueMaxValue * mouse.x /canvasWidth
	}
</script>

<style>
	h1 {
		color: red;
	}
	canvas {
		height: 100vh;
		width: 100vw;
		/* background-color: red; */
		background-color: hsl(var(--hue), 50%, 50%);
	}
</style>

<h1>x = {mouse.x} y = {mouse.y}</h1>
<p>height = {canvasHeight} width = {canvasWidth}</p>
<p>hue = {hue}</p>
<canvas 
	style="--hue:{hue}"
	on:mousemove={handleMouseMove}
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
>
</canvas>