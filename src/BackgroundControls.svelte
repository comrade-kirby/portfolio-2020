<script>
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'


  import P5Canvase from './P5Canvas.svelte'
  import { screenHeight, minimized, currentView } from './stores.js'
  import { drawContainer, transparentText } from './helpers'
  import drawControlButton from './backgroundControl.js'
  import { controlsXOffset } from './constants.js'

  let controlsHeight, controlsWidth
  let maximizeHover = false
  let somethingHover = false
  let somethingOpen = false
  let somethingRadius = tweened(0, {
    duration: 1000,
    easing: cubicOut
  })
  let sizeHover = false
  let sizeOpen = false
  let sizeRadius = tweened(0, {
    duration: 1000,
    easing: cubicOut
  })
  let speedHover = false
  let speedOpen = false
  let speedRadius = tweened(0, {
    duration: 1000,
    easing: cubicOut
  })
  
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
    const xPosition = controlsXOffset + 20
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
    p5.line(controlsXOffset, 80, controlsXOffset + 60, 80)
    p5.noErase()

    p5.noFill()
    drawMaximizeIcon(p5)
    p5.line(controlsXOffset, 80, controlsXOffset + 60, 80)

    drawLabel(p5, $currentView, controlsXOffset + 30, 60, maximizeHover)
  }

  const drawControlTitle = (p5) => {
    const verticalText = [...'canvas'].map(letter => letter + '\n').join('')
    transparentText(p5, {
      text: verticalText,
      textSize: 24,
      textLeading: 22,
      horizontalAlignment: p5.CENTER,
      xPosition: controlsXOffset + 30,
      yPosition: 115
    })
  }

  const sketch = (p5) => {
    p5.setup = () => {
      const canvas = p5.createCanvas(controlsWidth, $screenHeight)
      canvas.parent('canvas-controls')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
    }

    p5.draw = () => {
      const somethingButtonOptions = {
        text: 'something',
        yPosition: controlsHeight - 190,
        radius: $somethingRadius,
        hover: somethingHover
      }
      console.log(somethingHover)
      const sizeButtonOptions = {
        text: 'size',
        yPosition: controlsHeight - 120,
        radius: $sizeRadius,
        hover: sizeHover
      }
      const speedButtonOptions = {
        text: 'speed',
        yPosition: controlsHeight - 50,
        radius: $speedRadius,
        hover: speedHover
      }
      drawContainer(p5, 60, $screenHeight, 240)
      drawMaximizeTab(p5)
      drawControlTitle(p5)
      drawControlButton(p5, 'size', somethingButtonOptions)
      drawControlButton(p5, 'size', sizeButtonOptions)
      drawControlButton(p5, 'speed', speedButtonOptions)
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
    right: 0;
    opacity: 0;
  }

  .something-button {
    bottom: 140px;
    width: 60px;
    height: 70px;
  }

  .size-button {
    bottom: 70px;
    width: 60px;
    height: 70px;
  }
  
  .speed-button {
    bottom: 0px;
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