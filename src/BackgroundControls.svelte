<script>
  import { fade } from 'svelte/transition'

  import P5Canvase from './P5Canvas.svelte'
  import { screenHeight, minimized } from './stores.js'
  import { drawContainer } from './helpers'

  let controlsHeight, controlsWidth
  let maximizeHover = false

  const drawMaximizeButton = (p5) => {
    const xPosition = 20
    const yPosition = 20
    p5.strokeWeight(2)
    p5.erase(0, 255)
    p5.line(xPosition + 7, yPosition + 7, xPosition + 13, yPosition + 7)
    p5.rect(xPosition + 5, yPosition + 5, 10, 10)
    p5.rect(xPosition, yPosition, 20, 20)
    p5.noErase()
    
    maximizeHover ? p5.stroke(0, 0, 0, 20) : p5.stroke(0, 0, 0, 15)
    p5.noFill()
    p5.line(xPosition + 7, yPosition + 7, xPosition + 13, yPosition + 7)
    p5.rect(xPosition + 5, yPosition + 5, 10, 10)
    p5.rect(xPosition, yPosition, 20, 20)
  }

  const sketch = (p5) => {
    p5.setup = () => {
      const canvas = p5.createCanvas(controlsWidth, controlsHeight)
      canvas.parent('canvas-controls')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
    }

    p5.draw = () => {
      drawContainer(p5, controlsWidth, controlsHeight)
      drawMaximizeButton(p5)
    }
  }
</script>
<style>
  #canvas-controls {
    height: 99.6%;
    width: 100%;
  }

  button {
    position: absolute;
    right: 20px;
    top: 20px;
    height: 25px;
    width: 25px;
    opacity: 0;
  }
</style>

<div 
  id='canvas-controls' 
  transition:fade
  bind:clientHeight={controlsHeight}
  bind:clientWidth={controlsWidth}
>
  <button 
    on:click={() => {$minimized = false}} 
    on:mouseover={() => { maximizeHover = true }}
    on:mouseout={() => { maximizeHover = false }} />
  <P5Canvase sketch={sketch}/>
</div>