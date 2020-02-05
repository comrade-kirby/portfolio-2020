<script>
  import { onMount } from 'svelte'

  import P5Canvas from './P5Canvas.svelte'
  import { 
    screenHeight,
    screenWidth,
    longestScreenDimension,
    circleLocation,
    backgroundHue,
    circleHue,
    sizeValue
  } from './stores.js'

  const hueMaxValue = 360
  
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
      const fillAlpha = 7
      const circleSize = $sizeValue * ($longestScreenDimension * 1.1)

      p5.stroke($backgroundHue, saturation, strokeLightness, strokeAlpha);
      p5.strokeWeight(1)
      p5.fill($circleHue, saturation, fillLightness, fillAlpha)
      p5.ellipse($circleLocation.x, $circleLocation.y, circleSize, circleSize)
    }

    p5.windowResized = () => {
      p5.resizeCanvas($screenWidth, $screenHeight)
    }
  }

  const setRandomCircleLocation = (divisions) => {
    const randomNumber = () => { return Math.random() * divisions }
    const xPosition = $screenWidth / divisions * randomNumber()
    const yPosition = $screenHeight / divisions * randomNumber()

    circleLocation.set({ x: xPosition, y: yPosition })
  }
  
  setInterval(() => {
    circleHue.set(hueMaxValue * $circleLocation.x / $screenWidth)
    backgroundHue.set(hueMaxValue * $circleLocation.y / $screenHeight)
    setRandomCircleLocation(5)
  }, 3000)

  onMount(async () => {
    await $screenWidth && $screenHeight

    circleLocation.set({ x: $screenWidth / 2, y: $screenHeight / 2 }, {
      hard: true
    })
  })
</script>

<style>       
  div { 
    height: 100%;
    width: 100%;
    background-color: hsl(var(--backgroundHue), 50%, 95%);
    position: fixed;
    top: 0;
  }
</style>

<div
  id='background-holder'
  style='--backgroundHue:{$backgroundHue};'
>
  <P5Canvas sketch={sketch} />
</div>