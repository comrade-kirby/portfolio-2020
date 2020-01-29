<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from './P5Canvas.svelte'
  
  let aboutHeight, aboutWidth

  const drawContainer = (p5) => {
    p5.fill(0, 0, 100, 90)
    p5.noStroke()
    p5.rect(0, 0, aboutWidth, aboutHeight);
  }

  const drawTitle = (p5) => {
    const title = 'about'
    p5.textSize(24)
    p5.textAlign(p5.LEFT, p5.TOP)
    p5.text(title, 20, 20, aboutWidth - 20, 30)
  }

  const drawContent = (p5) => {
    const content = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam in nesciunt facilis. Aspernatur officia ratione laborum saepe aliquam, ut perspiciatis dolores a vitae facere veritatis suscipit, quas ipsum, ullam voluptate!'
    p5.textSize(18)
    p5.textAlign(p5.RIGHT, p5.BOTTOM)
    p5.text(content, 100, 40, aboutWidth - 120, aboutHeight - 60)
  }

  const drawText = (p5) => {
    p5.textSize(24)
    p5.erase()
    drawTitle(p5)
    drawContent(p5)
    p5.noErase()
    p5.fill(0, 0, 0, 15)
    drawContent(p5)
    drawTitle(p5)
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(aboutWidth, aboutHeight)
      canvas.parent('about')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      drawContainer(p5)
      drawText(p5)
	  }

    p5.windowResized = () => {
      p5.resizeCanvas(aboutWidth, aboutHeight)
      drawContainer(p5)
      drawText(p5)
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