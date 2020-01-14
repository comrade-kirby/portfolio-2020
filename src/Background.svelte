<script>
  import { spring, tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import P5Canvas from "./P5Canvas.svelte"

  let canvasWidth
	let canvasHeight

	let mouse = spring({ x: 0, y: 0 }, {
		stiffness: 0.00001,
		damping: .001
  })

  let backgroundHue = tweened(180, {
    duration: 1000,
    easing: cubicOut
  })

  let forgroundHue = tweened(180, {
    duration: 1000,
    easing: cubicOut
  })

  const circleSize = 1000
  const hueMaxValue = 360
  const lightness = "90%"
  const circles = []

  const handleMouseMove = (e) => {
    mouse.set({ x: e.clientX, y: e.clientY })
  }
  
  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(canvasWidth, canvasHeight);
      canvas.parent('background-holder');
	  }

	  p5.draw = () => {
      p5.colorMode(p5.HSL)
	    p5.background($backgroundHue, 50, 85)
      p5.noStroke()
      circles.forEach(circle => {
        p5.fill(circle.hue, 50, 85)
        p5.ellipse(circle.x, circle.y, circleSize, circleSize)
      })
      p5.fill($forgroundHue, 50, 85)
      p5.ellipse($mouse.x, $mouse.y, circleSize, circleSize)
    }
  }

  const updateCircles = () => {
    circles.push({x: $mouse.x, y: $mouse.y, hue: $forgroundHue})
    if (circles.length > 10 ) { circles.shift() }
  }

  setInterval(() => {
    backgroundHue.set(hueMaxValue * $mouse.x / canvasWidth)
		forgroundHue.set(hueMaxValue * $mouse.y / canvasHeight)
    updateCircles()
  }, 500)
</script>

<style>       
  div { height: 100%; width: 100% }
</style>

<div
  id='background-holder'
	on:mousemove={handleMouseMove}
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
>
</div>
<P5Canvas sketch={sketch} />