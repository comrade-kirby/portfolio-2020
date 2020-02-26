<script>
  import { onMount } from 'svelte'
  import P5Canvas from '../../P5Canvas.svelte'
  import drawInfoButton from './drawInfoButton.js'
  import { openControlButtons, setupCanvas } from '../../helpers'
  import {
    closedOnce,
    infoProgress,
    open,
    screenSize,
    touch,
    sizeProgress,
    speedProgress,
    opacityProgress,
    frequencyProgress
  } from '../../stores.js'

  const controlButtons = [sizeProgress, speedProgress, opacityProgress, frequencyProgress]

  let maxWidth
  let infoButtonWidth = 60
  let infoButtonHeight = 290
  let infoButtonXOffset = 0

  let infoParams = {
    progressWritable: infoProgress,
    hover: false
  }

  const handleClick = () => {
    infoProgress.set($infoProgress ? 0 : 1)
    open.set(false)
    if (!$closedOnce) {
      openControlButtons(controlButtons)
      closedOnce.set(true)
    }
  }

  const setInfoButtonWidth = (screenSize, infoProgress) => {
    maxWidth = screenSize = 'large' ? 480 : 375
    infoButtonWidth = (maxWidth * infoProgress) || 60
  }

  const slideInfoButton = (infoProgress) => {
    infoButtonXOffset = (60 - infoButtonWidth) * (1 - infoProgress) 
  }

  const sketch = (p5) => {
    p5.setup = () => {
      setupCanvas(p5, maxWidth, infoButtonHeight, 'info-button-canvas-container')
    }

    p5.draw = () => {
      drawInfoButton(p5, maxWidth, infoButtonHeight, infoParams, $screenSize, $touch)
    }
  }

  $: infoParams.progress = $infoProgress
  $: setInfoButtonWidth($screenSize, $infoProgress)
  $: slideInfoButton($infoProgress)

  onMount(() => { 
    infoParams.progress = $infoProgress
    setInfoButtonWidth($screenSize, $infoProgress)
    slideInfoButton($infoProgress)
  })
</script>

<style>
  #info-button-canvas-container {
    position: relative;
    right: 0;
    height: var(--height);
    width: var(--maxWidth);
    pointer-events: none;
  }

  .info-button { 
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: var(--infoButtonWidth);
    pointer-events: all;
    opacity: 0;
  }
</style>

<div 
  id='info-button-canvas-container'
  style='
    --infoButtonWidth:{infoButtonWidth}px; 
    --infoButtonXOffset:{infoButtonXOffset}px;
    --height:{infoButtonHeight}px;
    --maxWidth:{maxWidth}px;
  '
>
  <P5Canvas sketch={sketch}/>
  <button
    aria-label='animation info button'
    class='info-button'
    on:click={handleClick} 
    on:mouseover={() => { infoParams.hover = true }}
    on:mouseout={() => { infoParams.hover = false }} />
  {#if $infoProgress}
    <div class='screen-reader-content'>
      <h3>animation info</h3>
      <p>The animation behind moves for itsel. It reacts to your mouse and can be modified with the controls below</p>
      <p>size - size of shape</p>
      <p>speed - rate of movement</p>
      <p>opac - shape transparency</p>
      <p>freq - frequency of direction change</p>
      <p>click and hold to pull towards mouse</p>
    </div>
  {/if}
</div>