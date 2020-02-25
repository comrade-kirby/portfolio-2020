<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from '../../P5Canvas.svelte'
  import { closeHover, smallDimensions } from '../../stores.js'
  import {
    closeButtonMargin,
    drawContainer,
    drawXIcon,
    eraseArea,
    setupCanvas,
    transparentText,
    transparentTitle
  } from '../../helpers.js'
  
  let homeHeight, homeWidth

  const drawName = (p5) => {
    const textSize = $smallDimensions ? 36 : 48
    const margin = $smallDimensions ? 20 : 40
    p5.textAlign(p5.RIGHT, p5.BOTTOM)
    transparentText(p5, { 
      text: 'Max\nhouston\noppenheiMer', 
      textSize,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.BOTTOM,
      xPosition: homeWidth - margin, 
      yPosition: homeHeight - margin 
    })
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      setupCanvas(p5, homeWidth, homeHeight, 'home')
      p5.frameRate(10)
    }
    
    p5.draw = () => {
      eraseArea(p5, 0, homeWidth, homeHeight)
      drawContainer(p5, homeWidth, homeHeight)
      transparentTitle(p5, 'developMent | design | consulting', $smallDimensions)
      drawName(p5)
      const margin = closeButtonMargin($smallDimensions)
      drawXIcon(p5, homeWidth - margin, margin, $closeHover)
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