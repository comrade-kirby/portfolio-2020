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

  let backgroundHue = tweened(0, {
    duration: 1000,
    easing: cubicOut
  })

  let forgroundHue = tweened(0, {
    duration: 1000,
    easing: cubicOut
  })

  const circleSize = 2000
  const hueMaxValue = 360
  const lightness = 85
  const saturation = 50
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
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
	    p5.background($backgroundHue, saturation, lightness)
      p5.noStroke()
      circles.forEach((circle) => {
        p5.fill(circle.hue, saturation, lightness, circle.alpha)
        p5.ellipse(circle.x, circle.y, circleSize, circleSize)
        if (circle.alpha <= 50 && circle.fadeOut == false) {
          circle.alpha += 1
        } else {
          circle.fadeOut = true
          circle.alpha -= 0.3
        }
      })
      p5.fill($forgroundHue, saturation, lightness, 50)
      p5.ellipse($mouse.x, $mouse.y, circleSize, circleSize)
    }
  }

  const updateCircles = () => {
    circles.push({x: $mouse.x, y: $mouse.y, hue: $forgroundHue, alpha: 0, fadeOut: false})
    if (circles.length > 13 ) { circles.shift() }
  }

  setInterval(() => {
    backgroundHue.set(hueMaxValue * $mouse.x / canvasWidth)
    forgroundHue.set(hueMaxValue * $mouse.y / canvasHeight)
    updateCircles()
  }, 800)
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