<script>
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'
  import { cubicIn } from 'svelte/easing'


  import P5Canvase from './P5Canvas.svelte'
  import { screenHeight, minimized, currentView } from './stores.js'
  import { drawContainer, transparentText } from './helpers'
  import drawControlButton from './backgroundControl.js'
  import { controlsXOffset } from './constants.js'

  let controlsHeight, controlsWidth
  let maximizeHover = false

  const somethingWidth = tweened(0, {
    duration: 500,
    easing: cubicIn
  })
  const sizeWidth = tweened(0, {
    duration: 500,
    easing: cubicIn
  })
  const speedWidth = tweened(0, {
    duration: 500,
    easing: cubicIn
  })
  const somethingRadius = tweened(0, {
    duration: 500,
    easing: cubicIn
  })
  const sizeRadius = tweened(0, {
    duration: 500,
    easing: cubicIn
  })
  const speedRadius = tweened(0, {
    duration: 500,
    easing: cubicIn
  })

  let somethingHover = false
  let sizeHover = false
  let speedHover = false
  let buttons = ['something', 'size', 'speed']
  let openStates = [false, false, false]
  let widths = [somethingWidth, sizeWidth, speedWidth]
  let radii = [somethingRadius, sizeRadius, speedRadius]

  const handleClick = (button) => {
    const index = buttons.indexOf(button)
    let width = widths[index]
    let radius = radii[index]

    if (openStates[index]) {
      radius.set(0)
      width.set(0)
        openStates[index] = false
    } else {
      radius.set(50)
      width.set(240)
      setTimeout(() => {
        openStates[index] = true
      }, 500)    
    }
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
      const somethingButtonOptions = {
        text: 'something',
        yPosition: controlsHeight - 190,
        radius: $somethingRadius,
        width: $somethingWidth,
        hover: somethingHover,
        open: openStates[0]
      }
      const sizeButtonOptions = {
        text: 'size',
        yPosition: controlsHeight - 120,
        radius: $sizeRadius,
        width: $sizeWidth,
        hover: sizeHover,
        open: openStates[1]
      }
      const speedButtonOptions = {
        text: 'speed',
        yPosition: controlsHeight - 50,
        radius: $speedRadius,
        width: $speedWidth,
        hover: speedHover,
        open: openStates[2]
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
    on:click={() => {handleClick('something')}} 
    on:mouseover={() => { somethingHover = true }}
    on:mouseout={() => { somethingHover = false }} />
  <button 
    class='size-button'
    on:click={() => {handleClick('size')}} 
    on:mouseover={() => { sizeHover = true }}
    on:mouseout={() => { sizeHover = false }} />
  <button 
    class='speed-button'
    on:click={() => {handleClick('speed')}} 
    on:mouseover={() => { speedHover = true }}
    on:mouseout={() => { speedHover = false }} />

  <P5Canvase sketch={sketch}/>
</div>