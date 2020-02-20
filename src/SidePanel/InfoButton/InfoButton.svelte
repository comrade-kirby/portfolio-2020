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
    pullProgress,
    thinProgress,
    autoProgress
  } from '../../stores.js'

  const controlButtons = [sizeProgress, pullProgress, thinProgress, autoProgress]

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

  const setInfoButtonWidth = (smallDimensions) => {
    infoButtonWidth = smallDimensions ? 375 : 480
  }

  const slideInfoButton = (infoProgress) => {
    infoButtonXOffset = (60 - infoButtonWidth) * (1 - infoProgress) 
  }

  const sketch = (p5) => {
    p5.setup = () => {
      setupCanvas(p5, infoButtonWidth, infoButtonHeight, 'info-button-canvas-container')
    }

    p5.draw = () => {
      drawInfoButton(p5, infoButtonWidth, infoButtonHeight, infoParams, $smallDimensions)
    }
  }

  $: infoParams.progress = $infoProgress
  $: setInfoButtonWidth($smallDimensions)
  $: slideInfoButton($infoProgress)

  onMount(() => { 
    infoParams.progress = $infoProgress
    setInfoButtonWidth($smallDimensions)
    slideInfoButton($infoProgress)
  })
</script>

<style>
  #info-button-canvas-container {
    position: absolute;
    top: 70px;
    right: var(--infoButtonXOffset);
    height: var(--infoButtonHeight);
    width: var(--infoButtonWidth);
  }

  .info-button { 
    position: absolute;
    top: 0;
    right: 0;
    height: var(--infoButtonHeight);
    width: var(--infoButtonWidth);
    opacity: 0;
  }
</style>

<div 
  id='info-button-canvas-container'
  style='
    --infoButtonWidth:{infoButtonWidth}px; 
    --infoButtonHeight:{infoButtonHeight}px;
    --infoButtonXOffset:{infoButtonXOffset}px;
  '
>
  <P5Canvas sketch={sketch}/>
  <button
    class='info-button'
    on:click={handleClick} 
    on:mouseover={() => { infoParams.hover = true }}
    on:mouseout={() => { infoParams.hover = false }} />
</div>