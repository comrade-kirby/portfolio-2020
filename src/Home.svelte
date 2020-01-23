<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from './P5Canvas.svelte'
  
  let homeHeight
  let homeWidth

  const drawContainer = (p5) => {
    p5.fill(0, 0, 100, 90)
    p5.noStroke()
    p5.rect(0, 0, homeWidth, homeHeight);
  }

  const drawName = (p5) => {
    p5.textAlign(p5.RIGHT)
    p5.text('max', homeWidth - 20, homeHeight - 100)
    p5.text('houston', homeWidth - 20, homeHeight - 60)
    p5.text('oppenheimer', homeWidth - 20, homeHeight - 20)
  }

  const drawTitle = (p5) => {
    p5.textAlign(p5.LEFT)
    p5.text('creative', 20, 60)
    p5.text('web', 20, 100)
  }

  const drawText = (p5) => {
    p5.textSize(40)
    p5.erase()
    drawName(p5)
    drawTitle(p5)
    p5.noErase()
    p5.fill(0, 0, 0, 10)
    drawName(p5)
    drawTitle(p5)
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(homeWidth, homeHeight)
      canvas.parent('home-holder')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
      drawContainer(p5)
      drawText(p5)
	  }

    p5.windowResized = () => {
      p5.resizeCanvas(homeWidth, homeHeight)
      drawContainer(p5)
      drawText(p5)
    }
  }
</script>
  
<style>
  #home-holder {
    height: 50%;
    width: 50%;
    min-width: 300px;
  }
</style>

<div 
  id='home-holder'
  bind:clientHeight={homeHeight}
	bind:clientWidth={homeWidth}
  >
  <P5Canvas sketch={sketch} />
</div>