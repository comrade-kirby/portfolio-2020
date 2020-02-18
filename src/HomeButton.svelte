<script>
  import P5Canvas from './P5Canvas.svelte'
  import drawHomeButton from './drawHomeButton'
  import { setupCanvas } from './helpers'
  import {
    open,
    currentView,
    smallDimensions,
    infoProgress,
    sizeProgress,
    pullProgress,
    thinProgress,
    autoProgress 
  } from './stores'

  let homeButtonWidth, homeButtonHeight
  let homeHover = false
  let buttonProgresses = [
    infoProgress,
    sizeProgress,
    pullProgress,
    thinProgress,
    autoProgress 
  ]
  
  const handleOpen = () => {
    open.set(true)
    currentView.set('home')
    buttonProgresses.forEach(progress => progress.set(0))
  }

  const sketch = (p5) => {
    p5.setup = () => {
      setupCanvas(p5, homeButtonWidth, homeButtonHeight, 'home-button-canvas-container')
    }

    p5.draw = () => {
      drawHomeButton(p5, homeButtonWidth, homeButtonHeight, homeHover, $smallDimensions)
    }
  }
</script> 

<style>
  #home-button-canvas-container {
    height: 100%;
    width: 100%;
  }
  
  .home-button { 
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
</style>

<div 
  id='home-button-canvas-container'
  bind:clientHeight={homeButtonHeight}
  bind:clientWidth={homeButtonWidth}>
  <P5Canvas sketch={sketch}/>
</div>
<button 
  class='home-button'
  on:click={handleOpen} 
  on:mouseover={() => { homeHover = true }}
  on:mouseout={() => { homeHover = false }} />
