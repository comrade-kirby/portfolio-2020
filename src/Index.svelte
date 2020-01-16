<script>
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'

  import { screenHeight, screenWidth } from './stores.js'
  import P5Canvas from './P5Canvas.svelte'

  let cubeSize = writable(0)

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas($cubeSize, $cubeSize, p5.WEBGL)
      canvas.parent('index-holder')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
	  }

	  p5.draw = () => {
      p5.background(360, 100, 0, 0)
      p5.rotateX(p5.frameCount * .01)
      p5.rotateY(p5.frameCount * .02)
      p5.fill(0, 0, 0, 50)
      p5.stroke('white')
      p5.box($cubeSize / 2)
    }

    p5.windowResized = () => {
      p5.resizeCanvas($cubeSize, $cubeSize)
    }
  }

  onMount(async () => {
    await $screenHeight && $screenWidth

    let longestDimension = $screenHeight >= $screenWidth ? $screenHeight : $screenWidth
    cubeSize.set(longestDimension * .15)
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
  style='() => `${$cubeSize}px`'
>
</div>
<P5Canvas sketch={sketch} />