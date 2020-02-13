<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'

  import P5Canvase from './P5Canvas.svelte'
  import drawBackgroundControls from './drawBackgroundControls.js'
  import { setupCanvas } from './helpers'
  import { 
    screenHeight,
    open,
    currentView,
    sizeValue,
    pullValue,
    opacityValue,
    randomValue,
    infoProgress,
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

  let infoParams = {
    progressWritable: infoProgress,
    hover: false
  }

  let sizeButtonParams = {
    text: 'size',
    progressWritable: sizeProgress,
    hoverWritable: sizeHover
  }
  let pullButtonParams = {
    text: 'pull',
    progressWritable: pullProgress,
    hoverWritable: pullHover
  }
  let opacityButtonParams = {
    text: 'opacity',
    progressWritable: opacityProgress,
    hoverWritable: opacityHover
  }
  let randomButtonParams = {
    text: 'random',
    progressWritable: randomProgress,
    hoverWritable: randomHover
  }

  let buttonParams = [sizeButtonParams, pullButtonParams, opacityButtonParams, randomButtonParams]

  const setButtonParams = (text, progress, hover, value=null) => {
    const button = buttonParams.find(button => button.text == text)
    
    button.text = text
    button.value = value
    button.progress = progress
    button.hover = hover
  }

  const setButtonYPositions = () => {
    buttonParams.reverse().forEach((button, index) => {
      const heightOffset = 45 + (index * 70)
      button.yPosition = controlsHeight - heightOffset
    })
  }
  
  $: infoParams.progress = $infoProgress
  $: setButtonParams('size', $sizeProgress, $sizeHover, $sizeValue)
  $: setButtonParams('pull', $pullProgress, $pullHover, $pullValue)
  $: setButtonParams('opacity', $opacityProgress, $opacityHover, $opacityValue)
  $: setButtonParams('random', $randomProgress, $randomHover, $randomValue)

  const handleOpen = () => {
    open.set(true)
    currentView.set('home')
    buttonParams.forEach((button, index) => {
      button.progressWritable.set(0)
    })
  }

  const handleClick = (buttonText) => {
    const button = buttonParams.find(button => button.text == buttonText)
    if (button.progress == 0) {
      button.progressWritable.set(1)
    } else {
      button.progressWritable.set(0)
    }
  }

  const handleHover = (buttonText, hoverOn) => {
    const button = buttonParams.find(button => button.text == buttonText)

    button.hoverWritable.set(hoverOn ? true : false)
  }

  const sketch = (p5) => {
    p5.setup = () => {
      setupCanvas(p5, controlsWidth, $screenHeight, 'canvas-controls')
    }

    p5.draw = () => {
      drawBackgroundControls(p5, $screenHeight, maximizeHover, infoParams, buttonParams)
    }
  }

  onMount(() => {
    setButtonYPositions()
    infoParams.progress = $infoProgress
    setButtonParams('size', $sizeProgress, $sizeHover, $sizeValue)
    setButtonParams('pull', $pullProgress, $pullHover, $pullValue)
    setButtonParams('opacity', $opacityProgress, $opacityHover, $opacityValue) 
    setButtonParams('random', $randomProgress, $randomHover, $randomValue)
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

  .info-button {
    position: absolute;
    top: 80px;
    width: 60px;
    height: 220px;
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
  <button
    class='info-button'
    on:click={() => { infoProgress.set($infoProgress ? 0 : 1) }} 
    on:mouseover={() => { infoParams.hover = true }}
    on:mouseout={() => { infoParams.hover = false }} />
  {#each buttonParams as button, index}
    <button
      class='canvas-button'
      style='--bottom:{(buttonParams.length - 1) * 70 - index * 70}px'
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