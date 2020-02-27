<script>
  import { onMount } from 'svelte'

  import ControlSlider from './ControlSlider/ControlSlider.svelte'
  import ResetButton from './ResetButton/ResetButton.svelte'
  import { setupCanvas, logStiffness, logDamping } from '../../helpers'
  import { 
    circleLocation,
    screenSize,
    sizeValue,
    speedValue,
    opacityValue,
    frequencyValue,
    sizeProgress,
    speedProgress,
    opacityProgress,
    frequencyProgress,
  } from '../../stores.js'

  export let panelWidth 

  let sizeButtonParams = {
    text: 'size',
    progressWritable: sizeProgress,
  }
  let speedButtonParams = {
    text: 'speed',
    progressWritable: speedProgress,
  }
  let opacityButtonParams = {
    text: 'opac',
    progressWritable: opacityProgress,
  }
  let frequencyButtonParams = {
    text: 'freq',
    progressWritable: frequencyProgress,
  }

  let buttonParams = [sizeButtonParams, speedButtonParams, opacityButtonParams, frequencyButtonParams]

  const setButtonParams = (text, progress, value=null) => {
    const button = buttonParams.find(button => button.text == text)
    
    button.text = text
    button.value = value
    button.progress = progress
  }

  $: setButtonParams('size', $sizeProgress, $sizeValue)
  $: setButtonParams('speed', $speedProgress, $speedValue)
  $: setButtonParams('opac', $opacityProgress, $opacityValue)
  $: setButtonParams('freq', $frequencyProgress, $frequencyValue)

  const setCircleSpeed = (e) => {
    const value = e.target.value
    circleLocation.stiffness = logStiffness(value)
    circleLocation.damping = logDamping(value)
  }

  onMount(() => {
    setButtonParams('size', $sizeProgress, $sizeValue)
    setButtonParams('speed', $speedProgress, $speedValue)
    setButtonParams('opac', $opacityProgress, $opacityValue) 
    setButtonParams('freq', $frequencyProgress, $frequencyValue)
  })
</script>

<style>
  .background-controls {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    height: 100%;
    flex: 1;
    pointer-events: none;
  }

  .fill-div {
    height: 100%;
    background-color: hsla(0,0%,100%,90%);
    width: var(--width);
  }

  .bottom-padding {
    height: var(--height);
    background-color: hsla(0,0%,100%,90%);
    width: var(--width);
  }
</style>

<div 
  class="background-controls" 
  style='--width:{panelWidth}px'
  aria-label="background controls"
>
  <div class='fill-div'></div>
  <ResetButton panelWidth={panelWidth} />
  <ControlSlider
    panelWidth={panelWidth}
    button={sizeButtonParams} 
    progress={$sizeProgress}
    bind:value={$sizeValue}/>
  <ControlSlider
    panelWidth={panelWidth}
    button={speedButtonParams} 
    progress={$speedProgress}
    inputCallback={setCircleSpeed}
    bind:value={$speedValue}/>
  <ControlSlider
    panelWidth={panelWidth}
    button={opacityButtonParams} 
    progress={$opacityProgress}
    bind:value={$opacityValue}/>
  <ControlSlider
    panelWidth={panelWidth}
    button={frequencyButtonParams} 
    progress={$frequencyProgress}
    bind:value={$frequencyValue}/>
  <div 
    class='bottom-padding' 
    style='--height:{$screenSize == 'small' ? 50 : 10 }px'></div>
</div>
