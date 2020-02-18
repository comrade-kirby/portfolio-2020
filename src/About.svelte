<script>
  import { fade } from 'svelte/transition'
  
  import P5Canvas from './P5Canvas.svelte'
  import { closeHover, smallDimensions } from './stores.js'
  import { 
    closeButtonMargin,
    drawContainer,
    drawXIcon,
    eraseArea,
    transparentText,
    transparentTitle,
    setupCanvas
  } from './helpers.js'
  
  let aboutHeight, aboutWidth

  const drawContent = (p5) => {
    const textSize = $smallDimensions ? 10 : 16
    const margin = $smallDimensions ? 20 : 40
    const leftX = $smallDimensions ? 50 : 100
    const rightX = $smallDimensions ? 100 : 160

    const leftWidth = $smallDimensions ? aboutWidth - 80 : aboutWidth - 140
    const rightWidth = $smallDimensions ? aboutWidth - 110 : aboutWidth - 200

    transparentText(p5, {
      text: "i create for the web",
      textSize: textSize,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: leftX,
      yPosition: aboutHeight - margin - 360,
      width: leftWidth,
      height: 20
    })
    transparentText(p5, {
      text: "i leverage animation and interaction design to build visually informative and joyful applications",
      textSize: textSize,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: rightX,
      yPosition: aboutHeight - margin - 320,
      width: rightWidth,
      height: 60
    })
    transparentText(p5, {
      text: "i value transparency, compassion, and curiosity",
      textSize: textSize,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: leftX,
      yPosition: aboutHeight - margin - 250,
      width: leftWidth,
      height: 40
    })
    transparentText(p5, {
      text: "i am passionate about designing inovative and interactive experiences and work to make the internet more fun, more accessible, more human",
      textSize: textSize,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: rightX,
      yPosition: aboutHeight - margin - 200,
      width: rightWidth,
      height: 90
    })
    transparentText(p5, {
      text: "call on me for technical experience, creative direction, and software consulting",
      textSize: textSize,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.CENTER,
      xPosition: leftX,
      yPosition: aboutHeight - margin - 90,
      width: leftWidth,
      height: 40
    })
    transparentText(p5, {
      text: "together we can build a better web :)",
      textSize: textSize,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.BOTTOM,
      xPosition: aboutWidth - margin,
      yPosition: aboutHeight - margin,
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
      transparentTitle(p5, "who aM i? asking for a friend", $smallDimensions)
      drawContent(p5)
      const margin = closeButtonMargin($smallDimensions)
      drawXIcon(p5, aboutWidth - margin, margin, $closeHover)
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