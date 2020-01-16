<script>
  import { spring, tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  import P5Canvas from './P5Canvas.svelte'
  import { screenHeight, screenWidth, longestScreenDimension } from './stores.js'

  const hueMaxValue = 360
  
  let circleSize
  let circle = spring({ x: $screenWidth / 2, y: $screenHeight / 2 }, {
      stiffness: 0.0001,
      damping: .01
    })

  let circleHue = tweened(90, {
    duration: 1500,
    easing: cubicOut
  })

  let backgroundHue = tweened(270, {
    duration: 1500,
    easing: cubicOut
  })

  const handleMouseMove = (e) => {
    circle.set({ x: e.clientX, y: e.clientY })
  }
  
  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas($screenWidth, $screenHeight)
      canvas.parent('background-holder')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
	  }

	  p5.draw = () => {
      const saturation = 100
      const strokeLightness = 97
      const strokeAlpha = 100
      const fillLightness = 85
      const fillAlpha = 10

      p5.stroke($backgroundHue, saturation, strokeLightness, strokeAlpha);
      p5.strokeWeight(1)
      p5.fill($circleHue, saturation, fillLightness, fillAlpha)
      p5.ellipse($circle.x, $circle.y, circleSize, circleSize)
    }

    p5.windowResized = () => {
      p5.resizeCanvas($screenWidth, $screenHeight)
    }
  }

  const setRandomCircleLocation = (divisions) => {
    const randomNumber = () => { return Math.random() * divisions }
    const xPosition = $screenWidth / divisions * randomNumber()
    const yPosition = $screenHeight / divisions * randomNumber()

    circle.set({ x: xPosition, y: yPosition })
  }
  
  setInterval(() => {
    circleHue.set(hueMaxValue * $circle.x / $screenWidth)
    backgroundHue.set(hueMaxValue * $circle.y / $screenHeight)
    setRandomCircleLocation(5)
  }, 1500)

  onMount(async () => {
    await $screenWidth && $screenHeight

    circleSize = $longestScreenDimension * 0.50
    circle.set({ x: $screenWidth / 2, y: $screenHeight / 2 }, {
      hard: true
    })
  })
</script>

<style>       
  div { 
    height: 100%;
    width: 100%;
    background-color: hsl(var(--backgroundHue), 50%, 95%);
  }
</style>

<div
  id='background-holder'
  style='--backgroundHue:{$backgroundHue};'
	on:mousemove={handleMouseMove}
>
</div>
<P5Canvas sketch={sketch} />