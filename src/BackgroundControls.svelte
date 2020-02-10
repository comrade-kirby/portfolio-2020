<script>
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'

  import P5Canvase from './P5Canvas.svelte'
  import { drawContainer, transparentText } from './helpers'
  import drawControlButton from './backgroundControl.js'
  import { controlsXOffset } from './constants.js'
  import { 
    screenHeight,
    open,
    currentView,
    sizeValue,
    pullValue,
    opacityValue,
    randomValue,
    sizeProgress,
    pullProgress,
    opacityProgress,
    randomProgress
  } from './stores.js'

  let controlsHeight, controlsWidth
  let maximizeHover = false
  
  let buttons = ['size', 'pull', 'opacity', 'random']
  let hoverStates = [false, false, false, false]
  
  let writableProgresses = [sizeProgress, pullProgress, opacityProgress, randomProgress]
  let values = [sizeValue, pullValue, opacityValue, randomValue]

  $: readableProgresses = [$sizeProgress, $pullProgress, $opacityProgress, $randomProgress]

  const handleClick = (button) => {
    const index = buttons.indexOf(button)
    const progress = readableProgresses[index]
    const writableProgress = writableProgresses[index]
    const value = values[index]

    if (progress == 0) {
      writableProgress.set(1)
    } else {
      writableProgress.set(0)
    }
  }

  const handleHover = (button, hoverOn) => {
    const index = buttons.indexOf(button)
    hoverStates[index] = hoverOn ? true : false
  }

  const drawLabel = (p5, x, y, hover) => {
    transparentText(p5, {
      text: 'home',
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

    drawLabel(p5, controlsXOffset + 30, 60, maximizeHover)
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
        yPosition: controlsHeight - 260,
        progress: $sizeProgress,
        hover: hoverStates[0],
      }
      const pullButtonOptions = {
        text: 'pull',
        value: $pullValue,
        yPosition: controlsHeight - 190,
        progress: $pullProgress,
        hover: hoverStates[1],
      }
      const opacityButtonOptions = {
        text: 'opacity',
        value: $opacityValue,
        yPosition: controlsHeight - 120,
        progress: $opacityProgress,
        hover: hoverStates[2],
      }
      const randomButtonOptions = {
        text: 'random',
        value: $randomValue,
        yPosition: controlsHeight - 50,
        progress: $randomProgress,
        hover: hoverStates[3],
      }

      drawContainer(p5, 60, $screenHeight, 240)
      drawMaximizeTab(p5)
      drawControlTitle(p5)
      drawControlButton(p5, sizeButtonOptions)
      drawControlButton(p5, pullButtonOptions)
      drawControlButton(p5, opacityButtonOptions)
      drawControlButton(p5, randomButtonOptions)
    }
  }
</script>

<style>
  #canvas-controls {
    height: 99.5%;
    width: 100%;
  }

  .open-button {
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

  .canvas-button {
    bottom: var(--bottom);
    width: 60px;
    height: 70px;
  }

  .canvas-input {
    position: absolute;
    right: 60px;
    bottom: var(--bottom);
    width: 230px;
    opacity: 0;
  }

input[type=range]::-webkit-slider-thumb {
  height: 35px;
  width: 35px;
  border-radius: 15px;
  cursor: pointer;
  opacity: 0;

}

input[type=range]::-moz-range-thumb {
  height: 35px;
  width: 35px;
  border-radius: 15px;
  margin-top: -14px;
  cursor: pointer;
  opacity: 0;

}

input[type=range]::-ms-thumb {
  height: 35px;
  width: 35px;
  border-radius: 15px;
  margin-top: -14px;
  cursor: pointer;
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
    class='open-button'
    on:click={() => {open.set(true); currentView.set('home') }} 
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
  {#if $sizeProgress}
    <input 
      class='canvas-input'
      style='--bottom:245px'
      type='range'
      min='0' max='1' step='0.01' 
      bind:value={$sizeValue} />
  {/if}
  {#if $pullProgress}
    <input 
      class='canvas-input'
      style='--bottom:175px'
      type='range'
      min='0' max='1' step='0.01' 
      bind:value={$pullValue} />
  {/if}
  {#if $opacityProgress}
    <input 
      class='canvas-input'
      style='--bottom:105px'
      type='range'
      min='0' max='1' step='0.01' 
      bind:value={$opacityValue} />
  {/if}
  {#if $randomProgress}
    <input 
      class='canvas-input'
      style='--bottom:35px'
      type='range'
      min='0' max='1' step='0.01' 
      bind:value={$randomValue} />
  {/if}
  <P5Canvase sketch={sketch}/>
</div>