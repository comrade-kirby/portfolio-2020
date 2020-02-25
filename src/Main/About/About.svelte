<script>
  import { fade } from 'svelte/transition'
  
  import P5Canvas from '../../P5Canvas.svelte'
  import drawAbout from './drawAbout'
  import { closeHover, screenSize } from '../../stores.js'
  import { setupCanvas } from '../../helpers.js'
  
  let aboutHeight, aboutWidth

  const sketch = (p5) => {
	  p5.setup = () => {
      setupCanvas(p5, aboutWidth, aboutHeight, 'about')
      p5.frameRate(10)
    }
    
    p5.draw = () => {
      drawAbout(p5, aboutWidth, aboutHeight, $screenSize, $closeHover)
    }

    p5.windowResized = () => {
      p5.resizeCanvas(aboutWidth, aboutHeight)
      p5.redraw()
    }
  }
</script>
  
<style>
 #about {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>

<div id='about'
  transition:fade
  bind:clientHeight={aboutHeight}
	bind:clientWidth={aboutWidth}
>
  <P5Canvas sketch={sketch} />
</div>