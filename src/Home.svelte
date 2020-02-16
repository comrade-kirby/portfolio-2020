<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from './P5Canvas.svelte'
  import { closeHover } from './stores.js'
  import {
    drawCloseButton,
    drawContainer,
    eraseArea,
    setupCanvas,
    transparentText,
    transparentTitle
  } from './helpers.js'
  
  let homeHeight, homeWidth

  const drawName = (p5) => {
    p5.textSize(40)
    p5.textAlign(p5.RIGHT, p5.BOTTOM)
    transparentText(p5, { text: 'Max', xPosition: homeWidth - 40, yPosition: homeHeight - 120 })
    transparentText(p5, { text: 'houston', xPosition: homeWidth - 40, yPosition: homeHeight - 80 })
    transparentText(p5, { text: 'oppenheiMer', xPosition: homeWidth - 40, yPosition: homeHeight - 40 })
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      setupCanvas(p5, homeWidth, homeHeight, 'home')
      p5.frameRate(10)

    }
    
    p5.draw = () => {
      eraseArea(p5, 0, homeWidth, homeHeight)
      drawContainer(p5, homeWidth, homeHeight)
      transparentTitle(p5, 'developMent | design | consulting')
      drawName(p5)
      drawCloseButton(p5, homeWidth, $closeHover)
    }

    p5.windowResized = () => {
      p5.resizeCanvas(homeWidth, homeHeight)
      p5.redraw()
    }
  }
</script>
  
<style>
  #home {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>

<div 
  id='home'
  transition:fade
  bind:clientHeight={homeHeight}
  bind:clientWidth={homeWidth}
>
  <P5Canvas sketch={sketch} />
</div>