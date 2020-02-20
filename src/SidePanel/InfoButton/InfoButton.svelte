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

  let infoButtonWidth, infoButtonHeight

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

  $: infoParams.progress = $infoProgress
  
  const sketch = (p5) => {
    p5.setup = () => {
      setupCanvas(p5, infoButtonWidth, infoButtonHeight, 'info-button-canvas-container')
    }

    p5.draw = () => {
      drawInfoButton(p5, infoButtonWidth, infoButtonHeight, infoParams, $smallDimensions)
    }
  }

  onMount(() => {
    infoParams.progress = $infoProgress
  })
</script>

<style>
  #info-button-canvas-container {
    height: 100%;
    width: 100%;
  }

  .info-button { 
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 60px;
    opacity: 0;
  }
</style>

<div 
  id='info-button-canvas-container'
  bind:clientHeight={infoButtonHeight}
  bind:clientWidth={infoButtonWidth}>
  <P5Canvas sketch={sketch}/>
</div>
<button
  class='info-button'
  on:click={handleClick} 
  on:mouseover={() => { infoParams.hover = true }}
  on:mouseout={() => { infoParams.hover = false }} />