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
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in nesciunt facilis. Aspernatur officia ratione laborum saepe aliquam, ut perspiciatis dolores a vitae facere veritatis suscipit, quas ipsum, ullam voluptate!',
      textSize: 18,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.BOTTOM,
      xPosition: 100,
      yPosition: 40,
      width: aboutWidth - 120,
      height: aboutHeight - 60
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
      transparentTitle(p5, 'about')
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