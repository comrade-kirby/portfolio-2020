<script>
  import { onMount } from "svelte"
  import { writable } from 'svelte/store';
	import p5 from "p5"

  let canvasWidth
	let canvasHeight

	let mouse = writable({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    mouse.set({ x: e.clientX, y: e.clientY })
  }
  
  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(canvasWidth, canvasHeight);
      canvas.parent('background-holder');
	  }

	  p5.draw = () => {
	    p5.background(100)
      p5.fill(50)
      p5.ellipse($mouse.x, $mouse.y, 50, 50)
    }
  }
	
	onMount(() => {
	  new p5(sketch)
	})
</script>

<style>
  div { height: 100%; width: 100% }
</style>

<div 
  id='background-holder'
  bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
  on:mousemove={handleMouseMove}
>
</div>