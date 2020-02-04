<script>
  import { fade } from 'svelte/transition'

  import P5Canvase from './P5Canvas.svelte'
  import { screenHeight, minimized, currentView } from './stores.js'
  import { drawContainer, transparentText } from './helpers'

  let controlsHeight, controlsWidth
  let maximizeHover = false

  const drawLabel = (p5, text, x, y, hover) => {
    transparentText(p5, {
      text: text,
      textSize: 16,
      horizontalAlignment: p5.CENTER,
      xPosition: x,
      yPosition: y,
      hover
    })
  }

  const drawMaximizeIcon = (p5) => {
    const xPosition = 20
    const yPosition = 20

    p5.strokeWeight(2)
    p5.rect(xPosition, yPosition, 20, 20)
    p5.rect(xPosition + 5, yPosition + 5, 10, 10)
    p5.strokeCap(p5.PROJECT)
    p5.line(xPosition + 7, yPosition + 7, xPosition + 13, yPosition + 7)
  }

  const drawMaximizeTab = (p5) => {
    maximizeHover ? p5.stroke(0, 0, 0, 20) : p5.stroke(0, 0, 0, 15)

    p5.erase(0, 255)
    drawMaximizeIcon(p5)
    p5.line(0, 80, 60, 80)
    p5.noErase()

    p5.noFill()
    drawMaximizeIcon(p5)
    p5.line(0, 80, 60, 80)

    drawLabel(p5, $currentView, 30, 60, maximizeHover)
  }

  const drawControlTitle = (p5) => {
    const verticalText = [...'controls'].map(letter => letter + '\n').join('')
    transparentText(p5, {
      text: verticalText,
      textSize: 24,
      textLeading: 22,
      horizontalAlignment: p5.CENTER,
      xPosition: 30,
      yPosition: 115
    })

  }

  const drawTransparentCircle = (p5, xPosition, yPosition, size) => {
    p5.strokeWeight(2)
    p5.stroke(0)
    
    p5.erase(0, 255)
    p5.ellipse(xPosition, yPosition, size, size)
    p5.noErase()

    p5.noFill()
    p5.stroke(0, 0, 0, 15)
    p5.ellipse(xPosition, yPosition, size, size)

    p5.stroke(0, 0, 100)
    p5.ellipse(xPosition, yPosition, size + 4, size + 4)
  }

  const drawSizeIcon = (p5, xPosition, yPosition) => {
    const size = 25

    drawTransparentCircle(p5, xPosition, yPosition, size)
  }

  const drawSpeedIcon = (p5, xPosition, yPosition) => {
    const size = 20
    drawTransparentCircle(p5, xPosition + 5, yPosition, 20)
    drawTransparentCircle(p5, xPosition, yPosition, 20)
    drawTransparentCircle(p5, xPosition - 5, yPosition, 20)
    
    p5.fill(0, 0, 100)
    p5.noStroke()
    p5.ellipse(xPosition - 5, yPosition, size - 2)
  }

  const drawControl = (p5, label, yPosition, icon) => {
    const xPosition = 30
    
    transparentText(p5, {
      text: label,
      textSize: 16,
      horizontalAlignment: p5.CENTER,
      xPosition: 30,
      yPosition: yPosition + 30
    })

    icon(p5, xPosition, yPosition)
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
      drawMaximizeTab(p5)
      drawControlTitle(p5)
      drawControl(p5, 'size', controlsHeight - 120, drawSizeIcon)
      drawControl(p5, 'speed', controlsHeight - 50, drawSpeedIcon)
    }
  }
</script>

<style>
  #canvas-controls {
    height: 99.5%;
    width: 100%;
  }

  button {
    position: absolute;
    width: 60px;
    height: 80px;
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