<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'

  import P5Canvase from './P5Canvas.svelte'
  import drawBackgroundControls from './drawBackgroundControls.js'
  import { setupCanvas } from './helpers'
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

  const sketch = (p5) => {
    p5.setup = () => {
      setupCanvas(p5, controlsWidth, $screenHeight, 'canvas-controls')
    }

    p5.draw = () => {
      drawBackgroundControls(p5, $screenHeight, maximizeHover, buttonOptions)
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