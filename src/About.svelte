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
      text: "i CREATE for the web",
      textSize: 16,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: 100,
      yPosition: aboutHeight - 400,
      width: aboutWidth - 180,
      height: 20
    })
    transparentText(p5, {
      text: "i leverage ANIMATION and INTERACTION design to build visually informative and joyful applications",
      textSize: 16,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: 160,
      yPosition: aboutHeight - 360,
      width: aboutWidth - 200,
      height: 60
    })
    transparentText(p5, {
      text: "i VALUE transparency, compassion, and curiosity",
      textSize: 16,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: 100,
      yPosition: aboutHeight - 280,
      width: aboutWidth - 140,
      height: 20
    })
    transparentText(p5, {
      text: "i am passionate about designing inovative and interactive experiences and work to make the internet more fun, more accessible, more HUMAN",
      textSize: 16,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: 160,
      yPosition: aboutHeight - 240,
      width: aboutWidth - 200,
      height: 90
    })
    transparentText(p5, {
      text: "CALL ON ME for technical experience, creative direction, and software consulting",
      textSize: 16,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: 100,
      yPosition: aboutHeight - 130,
      width: aboutWidth - 140,
      height: 40
    })
    transparentText(p5, {
      text: "together WE can build a better web :)",
      textSize: 16,
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
      transparentTitle(p5, "who aM i? asking for a friend")
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