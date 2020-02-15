<script>
  import { fade } from 'svelte/transition'
  
  import P5Canvas from './P5Canvas.svelte'
  import { closeHover } from './stores.js'
  import { 
    drawContainer,
    drawCloseButton,
    eraseArea,
    transparentText,
    transparentTitle,
    setupCanvas 
  } from './helpers.js'
  
  let aboutHeight, aboutWidth

  const drawContent = (p5) => {
    transparentText(p5, {
      text: "I create for the web.\n\nI am passionate about designing inovative and interactive experiences online and work to make the internet more fun.. more human. I value transparency, compassion, and curiosity above all else. I leverage animation and interaction design to build visually informative and joyful applications. Call on me for technical experience, creative direction, or general web consulting.",
      textSize: 18,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.BOTTOM,
      xPosition: 100,
      yPosition: 0,
      width: aboutWidth - 140,
      height: aboutHeight - 120
    })
    p5.rect()
    transparentText(p5, {
      text: "Together we can build a better web :)",
      textSize: 18,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.BOTTOM,
      xPosition: aboutWidth - 40,
      yPosition: aboutHeight - 40,
    })
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      setupCanvas(p5, aboutWidth, aboutHeight, 'about')
      p5.frameRate(10)
    }
    
    p5.draw = () => {
      eraseArea(p5, 0, aboutWidth, aboutHeight)
      drawContainer(p5, aboutWidth, aboutHeight)
      transparentTitle(p5, "who am i? asking for a friend")
      drawContent(p5)
      drawCloseButton(p5, aboutWidth, $closeHover)
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