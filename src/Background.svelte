<script>
  import { spring, tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  import P5Canvas from "./P5Canvas.svelte"

  let canvasWidth
	let canvasHeight
  let circle1 = spring({ x: 0, y: 0 }, {
    stiffness: 0.00001,
    damping: .001
  })

  let circle1Hue = tweened(90, {
    duration: 1000,
    easing: cubicOut
  })

  let backgroundColor = tweened(270, {
    duration: 1000,
    easing: cubicOut
  })
 
  const hueMaxValue = 360
  const lightness = 90
  const saturation = 100

  const handleMouseMove = (e) => {
    circle1.set({ x: e.clientX, y: e.clientY })
  }
  
  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(canvasWidth, canvasHeight);
      canvas.parent('background-holder');
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
	  }

	  p5.draw = () => {
      p5.noStroke()
      p5.fill($circle1Hue, saturation, lightness, 10)
      p5.ellipse($circle1.x, $circle1.y, 1000, 1000)
    }
  }

  setInterval(() => {
    circle1Hue.set(hueMaxValue * $circle1.x / canvasWidth)
    circle1.set({ x: canvasWidth / 2, y: canvasHeight / 2 })
  }, 1000)

  onMount(() => {
    circle1.set({ x: (canvasWidth / 3) * 1, y: (canvasHeight / 3) * 2 }, {
      hard: true
    })
  })
</script>

<style>       
  div { height: 100%; width: 100%; background-color: red;}
</style>

<div
  id='background-holder'
	on:mousemove={handleMouseMove}
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
>
</div>
<P5Canvas sketch={sketch} />