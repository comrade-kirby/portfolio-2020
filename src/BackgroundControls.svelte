<script>
  import { onMount } from 'svelte'
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
    randomProgress,
    sizeHover,
    pullHover,
    opacityHover,
    randomHover
  } from './stores.js'

  let controlsHeight, controlsWidth
  let maximizeHover = false

  let sizeButtonOptions = {
    text: 'size',
    progressWritable: sizeProgress,
    hoverWritable: sizeHover
  }
  let pullButtonOptions = {
    text: 'pull',
    progressWritable: pullProgress,
    hoverWritable: pullHover
  }
  let opacityButtonOptions = {
    text: 'opacity',
    progressWritable: opacityProgress,
    hoverWritable: opacityHover
  }
  let randomButtonOptions = {
    text: 'random',
    progressWritable: randomProgress,
    hoverWritable: randomHover
  }

  let buttonOptions = [sizeButtonOptions, pullButtonOptions, opacityButtonOptions, randomButtonOptions]

  const setButtonOptions = (text, value, progress, hover) => {
    const button = buttonOptions.find(button => button.text == text)
    
    button.text = text
    button.value = value
    button.progress = progress
    button.hover = hover
  }

  const setButtonYPositions = () => {
    buttonOptions.reverse().forEach((button, index) => {
      const heightOffset = 50 + (index * 70)
      button.yPosition = controlsHeight - heightOffset
    })
  }
  
  $: setButtonOptions('size', $sizeValue, $sizeProgress, $sizeHover)
  $: setButtonOptions('pull', $pullValue, $pullProgress, $pullHover)
  $: setButtonOptions('opacity', $opacityValue, $opacityProgress, $opacityHover)
  $: setButtonOptions('random', $randomValue, $randomProgress, $randomHover)

  const handleOpen = () => {
    open.set(true)
    currentView.set('home')
    buttonOptions.forEach((button, index) => {
      button.progressWritable.set(0)
    })
  }

  const handleClick = (buttonText) => {
    const button = buttonOptions.find(button => button.text == buttonText)
    if (button.progress == 0) {
      button.progressWritable.set(1)
    } else {
      button.progressWritable.set(0)
    }
  }

  const handleHover = (buttonText, hoverOn) => {
    const button = buttonOptions.find(button => button.text == buttonText)

    button.hoverWritable.set(hoverOn ? true : false)
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
      drawContainer(p5, 60, $screenHeight, 240)
      drawMaximizeTab(p5)
      drawControlTitle(p5)
      drawControlButton(p5, sizeButtonOptions)
      drawControlButton(p5, pullButtonOptions)
      drawControlButton(p5, opacityButtonOptions)
      drawControlButton(p5, randomButtonOptions)
    }
  }

  onMount(() => {
    setButtonYPositions()
    setButtonOptions('size', $sizeValue, $sizeProgress, $sizeHover)
    setButtonOptions('pull', $pullValue, $pullProgress, $pullHover)
    setButtonOptions('opacity', $opacityValue, $opacityProgress, $opacityHover) 
    setButtonOptions('random', $randomValue, $randomProgress, $randomHover)
  })
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
    on:click={handleOpen} 
    on:mouseover={() => { maximizeHover = true }}
    on:mouseout={() => { maximizeHover = false }} />
  
  {#each buttonOptions as button, index}
    <button
      class='canvas-button'
      style='--bottom:{(buttonOptions.length - 1) * 70 - index * 70}px'
      on:click={() => {handleClick(button.text)}} 
      on:mouseover={() => { handleHover(button.text, true) }}
      on:mouseout={() => { handleHover(button.text, false) }} />
    
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