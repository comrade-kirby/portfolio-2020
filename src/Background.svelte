<script>
  import { spring, tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  import P5Canvas from './P5Canvas.svelte'

  let canvasWidth
  let canvasHeight
  const hueMaxValue = 360
  const saturation = 100
  const lightness = 93

  let circle = spring({ x: 0, y: 0 }, {
    stiffness: 0.00001,
    damping: .001
  })

  let circleHue = tweened(90, {
    duration: 1000,
    easing: cubicOut
  })

  let backgroundHue = tweened(270, {
    duration: 1000,
    easing: cubicOut
  })

  const handleMouseMove = (e) => {
    circle.set({ x: e.clientX, y: e.clientY })
  }
  
  const sketch = (p5) => {
    const alpha = 10
	  p5.setup = () => {
      const canvas = p5.createCanvas(canvasWidth, canvasHeight)
      canvas.parent('background-holder')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
	  }

	  p5.draw = () => {
      p5.stroke($backgroundHue, saturation, 97, 100);
      p5.strokeWeight(1)
      p5.fill($circleHue, saturation, lightness, alpha)
      p5.ellipse($circle.x, $circle.y, 1500, 1500)
    }

    p5.windowResized = () => {
      p5.resizeCanvas(canvasWidth, canvasHeight)
    }
  }

  const setRandomCircleLocation = (divisions) => {
    const randomNumber = () => { return Math.random() * divisions }
    const xPosition = canvasWidth / divisions * randomNumber()
    const yPosition = canvasHeight / divisions * randomNumber()

    circle.set({ x: xPosition, y: yPosition })
  }
  
  setInterval(() => {
    circleHue.set(hueMaxValue * $circle.x / canvasWidth)
    backgroundHue.set(hueMaxValue * $circle.y / canvasHeight)
    setRandomCircleLocation(5)
  }, 1000)

  onMount(() => {
    circle.set({ x: canvasWidth / 2, y: canvasHeight / 2 }, {
      hard: true
    })
  })
</script>

<style>       
  div { 
    height: 100%;
    width: 100%;
    background-color: hsl(var(--backgroundHue), var(--saturation), var(--lightness));
  }
</style>

<div
  id='background-holder'
  style='--backgroundHue:{$backgroundHue}; --saturation:{`${saturation}%`}; --lightness:{`${lightness}%`}'
	on:mousemove={handleMouseMove}
	bind:clientHeight={canvasHeight}
	bind:clientWidth={canvasWidth}
>
</div>
<P5Canvas sketch={sketch} />