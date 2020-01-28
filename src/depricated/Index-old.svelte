<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  import { longestScreenDimension, backgroundHue, circleHue, screenHeight, screenWidth } from './stores.js'
  import P5Canvas from './P5Canvas.svelte'

  let boxDimensions = tweened([0, 0, 0], {
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
      p5.blendMode(p5.DIFFERENCE);

      if (isOpen) {
        alignBox()
      } else {
        xRotation.set(p5.frameCount * 0.01)
        yRotation.set(p5.frameCount * 0.02)
      }
      p5.rotateX($xRotation)
      p5.rotateY($yRotation)
      p5.ambientLight(100, 0, 80)
      p5.directionalLight($circleHue, 100, 80, -1, 1, -1);
      
      p5.ambientMaterial($backgroundHue, 50, 90, 90);
      p5.stroke($backgroundHue, 100, 90)
      p5.box(...$boxDimensions)
    }

    p5.windowResized = () => {
      p5.resizeCanvas($screenWidth, $screenHeight)
    }
  }

  const alignBox = () => {
    const xRadians = $xRotation / Math.PI
    const yRadians = $yRotation / Math.PI
    const roundedX = Math.round(xRadians / 2) * 2 // to nearest 2
    const roundedY = Math.round(yRadians / 2) * 2 // to nearest 2
    xRotation.set(roundedX * Math.PI, { duration: 500 })
    yRotation.set(roundedY * Math.PI, { duration: 500 })
  }

  const open = () => {
    isOpen = true
    setBoxDimensions(.50, .50, 0.01)
  }

  const calculateSideLength = (multiplier) => $longestScreenDimension * multiplier

  const setBoxDimensions = (xMultiplier, yMultiplier = null, zMultiplier = null) => {
    if (!isOpen) {
      const newSideLength = calculateSideLength(xMultiplier)
      boxDimensions.set([newSideLength, newSideLength, newSideLength])
    } else {
      const y = $screenWidth * xMultiplier
      const x = $screenHeight * yMultiplier
      const z = calculateSideLength(zMultiplier)
      boxDimensions.set([x, y, z])
    }
  }

  onMount(async () => {
    await $longestScreenDimension
    const initialSize = calculateSideLength(0.05)
    boxDimensions.set([initialSize, initialSize, initialSize], {
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
<!-- need to disable mouse events when box is open -->
<div 
  id='index-holder'
>
  <div 
    class='mouse-capture'
    style='--cubeSize:{`${$boxDimensions[0] * 2}px`}'
    on:mousedown={() => {setBoxDimensions(.04)}}
    on:mouseup={open}
    on:mouseover={() => setBoxDimensions(.06)}
    on:mouseout={() => setBoxDimensions(.05)}
  >
  </div>
  <P5Canvas sketch={sketch} />
</div>