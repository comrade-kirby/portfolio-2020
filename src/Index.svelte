<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  import { longestScreenDimension } from './stores.js'
  import P5Canvas from './P5Canvas.svelte'

  let cubeSize = tweened(0, {
    duration: 500,
    easing: cubicOut
  })

  let canvasSize = tweened(0, {
    duration: 50,
    easing: cubicOut
  })

  let isOpen = false
  let sizeChanged = false

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas($cubeSize, $cubeSize, p5.WEBGL)
      canvas.parent('index-holder')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
	  }

	  p5.draw = () => {
      if (sizeChanged) {
        p5.background(360, 100, 0, 0)
        p5.resizeCanvas($canvasSize, $canvasSize)
      }
      p5.background(360, 100, 0, 0)
      p5.rotateX(p5.frameCount * .01)
      p5.rotateY(p5.frameCount * .02)
      p5.directionalLight(0, 100, 100, -1, 1, -1);
      p5.specularMaterial(20, 100, 50, 85);
      p5.stroke('white')
      p5.box($cubeSize / 2)
    }

    p5.windowResized = () => {
      p5.resizeCanvas($cubeSize, $cubeSize)
    }
  }

  const open = () => {
    setCubeSize(0.40)
    isOpen = true
  }

  const calculateCubeSize = (multiplier) => $longestScreenDimension * multiplier

  const setCubeSize = async (multiplier) => {
    const newCubeSize = calculateCubeSize(multiplier)
    if (!isOpen) {
      if (newCubeSize > $cubeSize) {
        sizeChanged = true
        await canvasSize.set(newCubeSize)
        cubeSize.set(newCubeSize)
      } else {
        await cubeSize.set(newCubeSize)
        sizeChanged = true
        await canvasSize.set(newCubeSize)
      }
      sizeChanged = false
    }
  }

  onMount(async () => {
    await $longestScreenDimension
    const initialSize = calculateCubeSize(0.10)
    cubeSize.set(initialSize, {
      duration: 0
    })
    canvasSize.set(initialSize, {
      duration: 0
    })
  })
</script> 

<style>
  div { 
    height: var(--cubeSize);
    width: var(--cubeSize);
    position: absolute;
    z-index: 1;
  }
</style>

<div 
  id='index-holder'
  style='--cubeSize:{`${canvasSize}px`}'
  on:mousedown={() => {setCubeSize(.08)}}
  on:mouseup={open}
  on:mouseover={() => setCubeSize(.12)}
  on:mouseout={() => setCubeSize(.10)}
>
  <P5Canvas sketch={sketch} />
</div>