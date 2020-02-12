<script>
  import { onMount } from 'svelte'

  import { setupCanvas } from './helpers.js'
  import P5Canvas from './P5Canvas.svelte'
  import { 
    screenHeight,
    screenWidth,
    longestScreenDimension,
    circleLocation,
    backgroundHue,
    circleHue,
    sizeValue,
    opacityValue,
		randomValue
  } from './stores.js'

  const hueMaxValue = 360
  let interval
  $: {
    setRandomness($randomValue)
  }

  const generateCoordinates = (p5) => {
    const circleSize = $sizeValue * ($longestScreenDimension * 1.1)
    const centerX = $circleLocation.x
    const centerY = $circleLocation.y

    const pointsCount = 5
    const sectionAngle = Math.PI*2 / pointsCount
    const radius = circleSize / 2
    let coordinates = []
    for (let i = 1; i <= pointsCount; i++) {
      var angle = i * sectionAngle
      
      const xOffset = Math.cos(angle) * radius
      const yOffset = Math.sin(angle) * radius
      const distanceToCenter = (Math.sqrt(
        ((p5.mouseX - centerX) ** 2) + ((p5.mouseY - centerY) ** 2)
      ))
      
      let x = centerX + xOffset
      let y = centerY + yOffset

      const distanceToVertex = (Math.sqrt(
        ((p5.mouseX - x) ** 2) + ((p5.mouseY - y) ** 2)
      ))
      
      const maxPush = $longestScreenDimension / 4
      const push = maxPush - distanceToVertex

      if (push > 0 ) {
        let pushPercentage = (push / maxPush)

        if (distanceToCenter > radius) {
          x = centerX + (xOffset * (1 - pushPercentage))
          y = centerY + (yOffset * (1 - pushPercentage))
        } else {
          x = centerX + xOffset - (xOffset * pushPercentage)
          y = centerY + yOffset - (yOffset * pushPercentage)
        }
      }

      coordinates.push([x,  y])
    }

    return coordinates
  }

  const drawShape = (p5, coordinates) => {
    const saturation = 100
    const strokeLightness = 97
    const strokeAlpha = 100
    const fillLightness = 85
    const fillAlpha = 100 - $opacityValue * 100

    p5.stroke($backgroundHue, saturation, strokeLightness, strokeAlpha);
    p5.strokeWeight(1)
    p5.fill($circleHue, saturation, fillLightness, fillAlpha)
    
    p5.beginShape();
    coordinates.forEach(coordinate => {
      p5.curveVertex(coordinate[0], coordinate[1])
    })
    p5.curveVertex(coordinates[0][0], coordinates[0][1])
    p5.curveVertex(coordinates[1][0], coordinates[1][1])
    p5.curveVertex(coordinates[2][0], coordinates[2][1])
    p5.endShape()
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      setupCanvas(p5, $screenWidth, $screenHeight, 'background-holder')
      p5.frameRate(10)
	  }

	  p5.draw = () => {
      const coordinates = generateCoordinates(p5)

      drawShape(p5, coordinates)
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
  
  const setRandomness = (randomValue) => {
    clearInterval(interval)
    if (randomValue == 0) { return }
    
    const milliseconds = (1 - randomValue) * 5000
    interval = setInterval(() => { setRandomCircleLocation(5) }, milliseconds)
  }

  onMount(async () => {
    await $screenWidth && $screenHeight

    circleLocation.set({ x: $screenWidth / 2, y: $screenHeight / 2 }, {
      hard: true
    })
  })

  setInterval(() => {
    circleHue.set(hueMaxValue * $circleLocation.x / $screenWidth)
    backgroundHue.set(hueMaxValue * $circleLocation.y / $screenHeight)
  }, 1000);
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