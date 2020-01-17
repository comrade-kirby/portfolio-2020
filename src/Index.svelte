<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  import { longestScreenDimension, backgroundHue, circleHue, screenHeight, screenWidth } from './stores.js'
  import P5Canvas from './P5Canvas.svelte'

  let cubeSize = tweened(0, {
    duration: 500,
    easing: cubicOut
  })

  let isOpen = false

  const xRotation = tweened(0, {
    duration: 0,
    easing: cubicOut
  })
  
  const yRotation = tweened(0, {
    duration: 0,
    easing: cubicOut
  })

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas($screenWidth, $screenHeight, p5.WEBGL)
      canvas.parent('index-holder')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
	  }

	  p5.draw = () => {
      p5.background(360, 100, 0, 0)
      if (isOpen) {
        alignBox()
      } else {
        xRotation.set(p5.frameCount * 0.01)
        yRotation.set(p5.frameCount * 0.02)
      }
      p5.rotateX($xRotation)
      p5.rotateY($yRotation)
      p5.directionalLight($circleHue, 100, 50, -1, 1, -1);
      p5.specularMaterial($backgroundHue, 100, 90, 50);
      p5.stroke($backgroundHue, 100, 90)
      p5.box($cubeSize / 2)
    }

    p5.windowResized = () => {
      p5.resizeCanvas($screenWidth, $screenHeight)
    }
  }

  const alignBox = () => {
    const xRadians = $xRotation / Math.PI
    const yRadians = $yRotation / Math.PI
    const roundedX = Math.round(xRadians * 2) / 2 // to nearest .5
    const roundedY = Math.round(yRadians * 2) / 2 // to nearest .5

    xRotation.set(roundedX * Math.PI, { duration: 500 })
    yRotation.set(roundedY * Math.PI, { duration: 500 })
  }

  const open = () => {
    setCubeSize(0.40)
    isOpen = true
  }

  const calculateCubeSize = (multiplier) => $longestScreenDimension * multiplier

  const setCubeSize = async (multiplier) => {
    if (!isOpen) {
      cubeSize.set(calculateCubeSize(multiplier))
    }
  }

  onMount(async () => {
    await $longestScreenDimension
    const initialSize = calculateCubeSize(0.10)
    cubeSize.set(initialSize, {
      duration: 0
    })
  })
</script> 

<style>
  div { 
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1;
  }

  .mouse-capture {
    height: var(--cubeSize);
    width: var(--cubeSize);
  }
</style>

<div 
  id='index-holder'
>
  <div 
    class='mouse-capture'
    style='--cubeSize:{`${$cubeSize}px`}'
    on:mousedown={() => {setCubeSize(.08)}}
    on:mouseup={open}
    on:mouseover={() => setCubeSize(.12)}
    on:mouseout={() => setCubeSize(.10)}
  >
  </div>
  <P5Canvas sketch={sketch} />
</div>