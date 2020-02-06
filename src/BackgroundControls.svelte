<script>
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'
  import { cubicIn } from 'svelte/easing'

  import P5Canvase from './P5Canvas.svelte'
  import { drawContainer, transparentText } from './helpers'
  import drawControlButton from './backgroundControl.js'
  import { controlsXOffset } from './constants.js'
  import { 
    screenHeight,
    minimized,
    currentView,
    somethingValue,
    sizeValue,
    speedValue
  } from './stores.js'

  let controlsHeight, controlsWidth
  let maximizeHover = false

  const somethingProgress = tweened(0, { easing: cubicIn })
  const sizeProgress = tweened(0, { easing: cubicIn })
  const speedProgress = tweened(0, { easing: cubicIn })
  
  // let somethingHover = false
  // let sizeHover = false
  // let speedHover = false
  let buttons = ['size', 'speed', 'something']
  let openStates = [false, false, false]
  let hoverStates = [false, false, false]
  let progresses = [sizeProgress, speedProgress, somethingProgress]
  let values = [sizeValue, speedValue, somethingValue]

  const handleClick = (button) => {
    console.log(button)
    const index = buttons.indexOf(button)
    const progress = progresses[index]
    const value = values[index]

    if (openStates[index]) {
      progress.set(0)
      openStates[index] = false
    } else {
      progress.set(1)
      openStates[index] = true
    }
  }

  const handleHover = (button, hoverOn) => {
    const index = buttons.indexOf(button)
    hoverStates[index] = hoverOn ? true : false

    // if (hoverState) {
    //   hover = true
    // } else {
    //   hover = false
    // }
  }

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
    }

    p5.draw = () => {
      const sizeButtonOptions = {
        text: 'size',
        value: $sizeValue,
        yPosition: controlsHeight - 190,
        progress: $sizeProgress,
        hover: hoverStates[0],
      }
      const speedButtonOptions = {
        text: 'speed',
        value: $speedValue,
        yPosition: controlsHeight - 120,
        progress: $speedProgress,
        hover: hoverStates[1],
      }
      const somethingButtonOptions = {
        text: 'something',
        value: $somethingValue,
        yPosition: controlsHeight - 50,
        progress: $somethingProgress,
        hover: hoverStates[2],
      }

      drawContainer(p5, 60, $screenHeight, 240)
      drawMaximizeTab(p5)
      drawControlTitle(p5)
      drawControlButton(p5, sizeButtonOptions)
      drawControlButton(p5, speedButtonOptions)
      drawControlButton(p5, somethingButtonOptions)
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
    opacity: 0.5;
    background-color: red;
  }

  .canvas-button {
    bottom: var(--bottom);
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
  
  {#each buttons.reverse() as button, index}
    <button
      class='canvas-button'
      style='--bottom:{(buttons.length - 1) * 70 - index * 70}px'
      on:click={() => {handleClick(button)}} 
      on:mouseover={() => { handleHover(button, true) }}
      on:mouseout={() => { handleHover(button, false) }} />
  {/each}

  <P5Canvase sketch={sketch}/>
</div>