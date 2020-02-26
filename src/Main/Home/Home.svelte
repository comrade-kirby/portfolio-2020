<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from '../../P5Canvas.svelte'
  import { closeHover, screenSize } from '../../stores.js'
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
    const textSize = $screenSize == 'large' ? 48 : 36
    const margin = $screenSize == 'large' ? 40 : 20
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
      transparentTitle(p5, 'developMent | design | consulting', $screenSize)
      drawName(p5)
      const margin = closeButtonMargin($screenSize)
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
  <div class='screen-reader-content'>
    <h2>Development, Design, Consulting</h2>
    <h1>Max Houston Oppenheimer</h1>
  </div>
  <P5Canvas sketch={sketch} />
</div>