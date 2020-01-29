<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from './P5Canvas.svelte'
  import { transparentText, transparentTitle } from './helpers.js'
  
  let aboutHeight, aboutWidth

  const drawContainer = (p5) => {
    p5.fill(0, 0, 100, 90)
    p5.noStroke()
    p5.rect(0, 0, aboutWidth, aboutHeight);
  }

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
      const canvas = p5.createCanvas(aboutWidth, aboutHeight)
      canvas.parent('about')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      drawContainer(p5)
      transparentTitle(p5, 'about')
      drawContent(p5)
	  }

    p5.windowResized = () => {
      p5.resizeCanvas(aboutWidth, aboutHeight)
      drawContainer(p5)
      transparentTitle(p5, 'about')
      drawContent(p5)
      // TODO: FIND IF YOU CAN TURN OFF P5 FRAMERATE IF NOT USING DRAW
    }
  }
</script>
  
<style>
 #about {
    position: absolute;
    top: 0;
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