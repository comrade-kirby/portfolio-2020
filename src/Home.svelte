<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from './P5Canvas.svelte'
  import { closeHover } from './stores.js'
  import { transparentText, transparentTitle, drawContainer, drawCloseButton } from './helpers.js'
  
  let homeHeight, homeWidth

  const drawName = (p5) => {
    p5.textSize(40)
    p5.textAlign(p5.RIGHT, p5.BOTTOM)
    transparentText(p5, { text: 'max', xPosition: homeWidth - 20, yPosition: homeHeight - 100 })
    transparentText(p5, { text: 'houston', xPosition: homeWidth - 20, yPosition: homeHeight - 60 })
    transparentText(p5, { text: 'oppenheimer', xPosition: homeWidth - 20, yPosition: homeHeight - 20 })
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(homeWidth, homeHeight)
      canvas.parent('home')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
    }
    
    p5.draw = () => {
      drawContainer(p5, homeWidth, homeHeight)
      transparentTitle(p5, 'home')
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