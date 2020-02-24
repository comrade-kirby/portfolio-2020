<script>
  import { onMount } from 'svelte'

  import ControlSlider from './ControlSlider/ControlSlider.svelte'
  import { setupCanvas, logStiffness, logDamping } from '../../helpers'
  import { 
    circleLocation,
    sizeValue,
    speedValue,
    opacityValue,
    frequencyValue,
    sizeProgress,
    speedProgress,
    opacityProgress,
    frequencyProgress,
    sizeHover,
    speedHover,
    opacityHover,
    frequencyHover
  } from '../../stores.js'

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

  const setButtonParams = (text, progress, hover, value=null) => {
    const button = buttonParams.find(button => button.text == text)
    
    button.text = text
    button.value = value
    button.progress = progress
  }

  $: setButtonParams('size', $sizeProgress, $sizeHover, $sizeValue)
  $: setButtonParams('speed', $speedProgress, $speedHover, $speedValue)
  $: setButtonParams('opac', $opacityProgress, $opacityHover, $opacityValue)
  $: setButtonParams('freq', $frequencyProgress, $frequencyHover, $frequencyValue)

  const setCircleSpeed = (e) => {
    const value = e.target.value
    circleLocation.stiffness = logStiffness(value)
    circleLocation.damping = logDamping(value)
  }

  onMount(() => {
    setButtonParams('size', $sizeProgress, $sizeHover, $sizeValue)
    setButtonParams('speed', $speedProgress, $speedHover, $speedValue)
    setButtonParams('opac', $opacityProgress, $opacityHover, $opacityValue) 
    setButtonParams('freq', $frequencyProgress, $frequencyHover, $frequencyValue)
  })
</script>

<style>
  .background-controls {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    min-height: 280px;
    height: 100%;
    flex: 1;
    width: 300px;
    pointer-events: none;
  }

  .fill-div {
    flex-grow: 1;
    background-color: hsla(0,0%,100%,90%);
    width: 60px;
  }

  .bottom-padding {
    height: 10px;
    background-color: hsla(0,0%,100%,90%);
    width: 60px;
  }
</style>

<div class="background-controls" >
  <div class='fill-div'></div>
  <ControlSlider
      button={sizeButtonParams} 
      progress={$sizeProgress}
      bind:value={$sizeValue}/>
  <ControlSlider
    button={speedButtonParams} 
    progress={$speedProgress}
    inputCallback={setCircleSpeed}
    bind:value={$speedValue}/>
  <ControlSlider
    button={opacityButtonParams} 
    progress={$opacityProgress}
    bind:value={$opacityValue}/>
  <ControlSlider
    button={frequencyButtonParams} 
    progress={$frequencyProgress}
    bind:value={$frequencyValue}/>
  <div class='bottom-padding'></div>
</div>
