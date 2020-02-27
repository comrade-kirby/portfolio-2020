<script>
  import { onMount } from 'svelte'
  import drawBackground from './drawBackground'
  import { setupCanvas } from '../helpers'
  import P5Canvas from '../P5Canvas.svelte'
  import { 
    active,
    backgroundHue,
    circleHue,
    circleLocation,
    frequencyValue,
    longestScreenDimension,
    opacityValue,
    reset,
    screenHeight,
    screenWidth,
    sizeValue
  } from '../stores.js'

  const hueMaxValue = 360
  let mousePull = false
  let mouseLocation = {x: 0, y: 0}
  let cursorStyle = 'pointer'
  let interval
  
  $: {
    setFrequency($frequencyValue)
  }

  const setRandomCircleCoords = () => {
    const divisions = 5
    const randomNum = () => { return Math.random() * divisions }
    const xPosition = $screenWidth / divisions * randomNum()
    const yPosition = $screenHeight / divisions * randomNum()
    circleLocation.set({ x: xPosition, y: yPosition })
  }
  
  const setCircleCenter = () => {
    circleLocation.set({ x: $screenWidth / 2, y: $screenHeight / 2 }, {
      hard: true
    })
  }
  
  const setFrequency = (frequencyValue) => {
    clearInterval(interval)
    if (frequencyValue == 0) { return }
    
    const milliseconds = (1 - frequencyValue) * 5000
    interval = setInterval(() => { setRandomCircleCoords() }, milliseconds)
  }

  const setMousePull = (pull) => {
    if (pull) {
     setFrequency(0)
     cursorStyle = 'cell'
    } else {
      setFrequency($frequencyValue)
      setRandomCircleCoords()
      cursorStyle = 'pointer'
    }
    mousePull = pull
  }

  const handleMousemove = (e) => {
    if (mousePull) {
      if (e.type == 'touchmove') {
        mouseLocation.x = e.touches[0].clientX
        mouseLocation.y = e.touches[0].clientY
      } else {
        mouseLocation.x = e.clientX
        mouseLocation.y = e.clientY
      }
    }
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      setupCanvas(p5, p5.windowWidth, p5.windowHeight, 'background-holder')
      p5.frameRate(10)
	  }

	  p5.draw = () => {
      if ($reset) { 
        p5.clear() 
        setCircleCenter()
        reset.set(false) 
      }
      drawBackground(p5, $opacityValue, $backgroundHue, $circleHue, $sizeValue, $circleLocation, $longestScreenDimension)
    }

    p5.windowResized = () => {
      p5.resizeCanvas($screenWidth, $screenHeight)
    }
  }

  $: backgroundHue.set(hueMaxValue * $circleLocation.y / $screenHeight)
  $: circleHue.set(hueMaxValue * $circleLocation.x / $screenWidth)
  $: circleLocation.set(mouseLocation)
  
  onMount(async () => {
    await $screenWidth && $screenHeight
    setCircleCenter()
  })

</script>

<style>       
  div { 
    height: 100%;
    width: 100%;
    background-color: hsl(var(--backgroundHue), 50%, 95%);
    position: fixed;
    top: 0;
    cursor: var(--cursorStyle);
  }
</style>

<div
  id='background-holder'
  style='--backgroundHue:{$backgroundHue}; --cursorStyle:{cursorStyle};'
  on:mousedown={() => setMousePull(true)}
  on:mouseup={() => setMousePull(false)}
  on:touchstart={() => setMousePull(true)}
  on:touchend={() => setMousePull(false)}
  on:touchmove={handleMousemove}
  on:mousemove={handleMousemove}
>
  <P5Canvas sketch={sketch} />
</div>