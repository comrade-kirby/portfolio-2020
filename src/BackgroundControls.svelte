<script>
  import { fade } from 'svelte/transition'

  import P5Canvase from './P5Canvas.svelte'
  import { screenHeight, minimized, currentView } from './stores.js'
  import { drawContainer, transparentText } from './helpers'

  let controlsHeight, controlsWidth
  let maximizeHover = false
  let somethingHover = false
  let somethingOpen = false
  let sizeHover = false
  let sizeOpen = false
  let speedHover = false
  let speedOpen = false

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
    const verticalText = [...'fun'].map(letter => letter + '\n').join('')
    transparentText(p5, {
      text: verticalText,
      textSize: 24,
      textLeading: 22,
      horizontalAlignment: p5.CENTER,
      xPosition: 30,
      yPosition: 115
    })

  }

  const drawTransparentCircle = (p5, xPosition, yPosition, size, hover) => {
    p5.strokeWeight(2)
    p5.stroke(0)
    
    p5.erase(0, 255)
    p5.ellipse(xPosition, yPosition, size, size)
    p5.noErase()

    p5.noFill()
    hover ? p5.stroke(0, 0, 0, 20) : p5.stroke(0, 0, 0, 15)
    p5.ellipse(xPosition, yPosition, size, size)

    p5.stroke(0, 0, 100)
    p5.ellipse(xPosition, yPosition, size + 4, size + 4)
  }

  const drawSizeIcon = (p5, xPosition, yPosition, hover) => {
    const size = 25

    drawTransparentCircle(p5, xPosition, yPosition, size, hover)
  }

  const drawSpeedIcon = (p5, xPosition, yPosition, hover) => {
    const size = 20
    drawTransparentCircle(p5, xPosition + 5, yPosition, 20, hover)
    drawTransparentCircle(p5, xPosition, yPosition, 20, hover)
    drawTransparentCircle(p5, xPosition - 5, yPosition, 20, hover)
    
    p5.fill(0, 0, 100)
    p5.noStroke()
    p5.ellipse(xPosition - 5, yPosition, size - 2)
  }

  const drawControlButton = (p5, icon, options) => {
    const { text, yPosition, hover } = options

    const xPosition = 30
    transparentText(p5, {
      text: text,
      textSize: 16,
      horizontalAlignment: p5.CENTER,
      xPosition: 30,
      yPosition: yPosition + 30,
      hover: hover
    })

    icon(p5, xPosition, yPosition, hover)
  }

  const sketch = (p5) => {
    p5.setup = () => {
      const canvas = p5.createCanvas(controlsWidth, controlsHeight)
      canvas.parent('canvas-controls')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
    }

    p5.draw = () => {
      const somethingButtonOptions = {
        text: 'something',
        yPosition: controlsHeight - 190,
        hover: somethingHover
      }
      const sizeButtonOptions = {
        text: 'size',
        yPosition: controlsHeight - 120,
        hover: sizeHover
      }
      const speedButtonOptions = {
        text: 'speed',
        yPosition: controlsHeight - 50,
        hover: speedHover
      }
      drawContainer(p5, controlsWidth, controlsHeight)
      drawMaximizeTab(p5)
      drawControlTitle(p5)
      drawControlButton(p5, drawSizeIcon, somethingButtonOptions)
      drawControlButton(p5, drawSizeIcon, sizeButtonOptions)
      drawControlButton(p5, drawSpeedIcon, speedButtonOptions)
    }
  }
</script>

<style>
  #canvas-controls {
    height: 99.5%;
    width: 100%;
  }

  .minimize-button {
    position: absolute;
    width: 60px;
    height: 80px;
  }

  button {
    margin: 0;
    position: absolute;
    opacity: 0;
  }

  .something-button {
    bottom: 150px;
    width: 60px;
    height: 70px;
  }

  .size-button {
    bottom: 80px;
    width: 60px;
    height: 70px;
  }
  
  .speed-button {
    bottom: 10px;
    width: 60px;
    height: 70px;
  }

</style>

<div 
  id='canvas-controls' 
  transition:fade
  bind:clientHeight={controlsHeight}
  bind:clientWidth={controlsWidth}
>
  <button 
    class='minimize-button'
    on:click={() => {$minimized = false}} 
    on:mouseover={() => { maximizeHover = true }}
    on:mouseout={() => { maximizeHover = false }} />
  <button 
    class='something-button'
    on:click={() => {somethingOpen = !somethingOpen}} 
    on:mouseover={() => { somethingHover = true }}
    on:mouseout={() => { somethingHover = false }} />
  <button 
    class='size-button'
    on:click={() => {sizeOpen = !sizeOpen}} 
    on:mouseover={() => { sizeHover = true }}
    on:mouseout={() => { sizeHover = false }} />
  <button 
    class='speed-button'
    on:click={() => {speedOpen = !speedOpen}} 
    on:mouseover={() => { speedHover = true }}
    on:mouseout={() => { speedHover = false }} />

  <P5Canvase sketch={sketch}/>
</div>