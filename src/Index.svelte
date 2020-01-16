<script>
  import { spring, tweened } from 'svelte/motion'
  import { onMount } from 'svelte'

  import { longestScreenDimension } from './stores.js'
  import P5Canvas from './P5Canvas.svelte'

  let cubeSize = 0
  let isOpen = false
  let sizeChanged = false

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(cubeSize, cubeSize, p5.WEBGL)
      canvas.parent('index-holder')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
	  }

	  p5.draw = () => {
      if (sizeChanged) {
        p5.resizeCanvas(cubeSize, cubeSize)
        sizeChanged = false
      }
      p5.background(360, 100, 0, 0)
      p5.rotateX(p5.frameCount * .01)
      p5.rotateY(p5.frameCount * .02)
      p5.fill(0, 0, 0, 50)
      p5.stroke('white')
      p5.box(cubeSize / 2)
    }

    p5.windowResized = () => {
      p5.resizeCanvas(cubeSize, cubeSize)
    }
  }

  const open = () => {
    resize(0.40)
    isOpen = true
  }

  const resize = (size) => {
    if (!isOpen) {
      sizeChanged = true
      cubeSize = $longestScreenDimension * size
    }
  }

  onMount(async () => {
    await $longestScreenDimension
    cubeSize = $longestScreenDimension * .15
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
  style='--cubeSize:{`${cubeSize}px`}'
  on:mousedown={() => {resize(.14)}}
  on:mouseup={open}
  on:mouseover={() => resize(.16)}
  on:mouseout={() => resize(.15)}
>
  <P5Canvas sketch={sketch} />
</div>