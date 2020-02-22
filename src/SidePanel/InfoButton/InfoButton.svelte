<script>
  import { onMount } from 'svelte'
  import P5Canvas from '../../P5Canvas.svelte'
  import drawInfoButton from './drawInfoButton.js'
  import { openControlButtons, setupCanvas } from '../../helpers'
  import {
    closedOnce,
    infoProgress,
    open,
    smallDimensions,
    sizeProgress,
    speedProgress,
    opacityProgress,
    frequencyProgress
  } from '../../stores.js'

  const controlButtons = [sizeProgress, speedProgress, opacityProgress, frequencyProgress]

  let maxWidth
  let infoButtonWidth = 60
  let infoButtonHeight = 220
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

  const setInfoButtonWidth = (smallDimensions, infoProgress) => {
    maxWidth = smallDimensions ? 375 : 480
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
      drawInfoButton(p5, maxWidth, infoButtonHeight, infoParams, $smallDimensions)
    }
  }

  $: infoParams.progress = $infoProgress
  $: setInfoButtonWidth($smallDimensions, $infoProgress)
  $: slideInfoButton($infoProgress)

  onMount(() => { 
    infoParams.progress = $infoProgress
    setInfoButtonWidth($smallDimensions, $infoProgress)
    slideInfoButton($infoProgress)
  })
</script>

<style>
  #info-button-canvas-container {
    position: relative;
    right: 0;
    height: 220px;
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
    --maxWidth:{maxWidth}px;
  '
>
  <P5Canvas sketch={sketch}/>
  <button
    class='info-button'
    on:click={handleClick} 
    on:mouseover={() => { infoParams.hover = true }}
    on:mouseout={() => { infoParams.hover = false }} />
</div>