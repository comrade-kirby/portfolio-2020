<script>
  import { onMount } from 'svelte'

  import ControlSlider from './ControlSlider/ControlSlider.svelte'
  import { setupCanvas, logStiffness, logDamping } from '../../helpers'
  import { 
    circleLocation,
    sizeValue,
    pullValue,
    thinValue,
    autoValue,
    sizeProgress,
    pullProgress,
    thinProgress,
    autoProgress,
    sizeHover,
    pullHover,
    thinHover,
    autoHover
  } from '../../stores.js'

  let controlsHeight, controlsWidth

  let sizeButtonParams = {
    text: 'size',
    progressWritable: sizeProgress,
  }
  let pullButtonParams = {
    text: 'pull',
    progressWritable: pullProgress,
  }
  let thinButtonParams = {
    text: 'thin',
    progressWritable: thinProgress,
  }
  let autoButtonParams = {
    text: 'auto',
    progressWritable: autoProgress,
  }

  let buttonParams = [sizeButtonParams, pullButtonParams, thinButtonParams, autoButtonParams]

  const setButtonParams = (text, progress, hover, value=null) => {
    const button = buttonParams.find(button => button.text == text)
    
    button.text = text
    button.value = value
    button.progress = progress
  }

  $: setButtonParams('size', $sizeProgress, $sizeHover, $sizeValue)
  $: setButtonParams('pull', $pullProgress, $pullHover, $pullValue)
  $: setButtonParams('thin', $thinProgress, $thinHover, $thinValue)
  $: setButtonParams('auto', $autoProgress, $autoHover, $autoValue)

  const setCirclePull = (e) => {
    const value = e.target.value
    circleLocation.stiffness = logStiffness(value)
    circleLocation.damping = logDamping(value)
  }

  onMount(() => {
    setButtonParams('size', $sizeProgress, $sizeHover, $sizeValue)
    setButtonParams('pull', $pullProgress, $pullHover, $pullValue)
    setButtonParams('thin', $thinProgress, $thinHover, $thinValue) 
    setButtonParams('auto', $autoProgress, $autoHover, $autoValue)
  })
</script>

<style>
  #controls-canvas-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    min-height: 280px;
    height: 100%;
    flex: 1;
    width: 60px;
    /* overflow: scroll; */
  }
</style>

<div 
  id='controls-canvas-container' 
  bind:clientHeight={controlsHeight}
  bind:clientWidth={controlsWidth} >
  <ControlSlider
      button={sizeButtonParams} 
      progress={$sizeProgress}
      bind:value={$sizeValue}/>
    <ControlSlider
      button={pullButtonParams} 
      progress={$pullProgress}
      inputCallback={setCirclePull}
      bind:value={$pullValue}/>
    <ControlSlider
      button={thinButtonParams} 
      progress={$thinProgress}
      bind:value={$thinValue}/>
    <ControlSlider
      button={autoButtonParams} 
      progress={$autoProgress}
      bind:value={$autoValue}/>
</div>