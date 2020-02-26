<script>
  import P5Canvas from '../../P5Canvas.svelte'
  import drawHomeButton from './drawHomeButton'
  import { setupCanvas } from '../../helpers'
  import {
    open,
    currentView,
    infoProgress,
    sizeProgress,
    speedProgress,
    opacityProgress,
    frequencyProgress 
  } from '../../stores'

  let homeButtonWidth, homeButtonHeight
  let homeHover = false
  let buttonProgresses = [
    infoProgress,
    sizeProgress,
    speedProgress,
    opacityProgress,
    frequencyProgress 
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
      drawHomeButton(p5, homeButtonWidth, homeButtonHeight, homeHover)
    }
  }
</script> 

<style>
  #home-button-canvas-container {
    width: 60px;
    min-height: 70px;
  }
  
  .home-button { 
    position: absolute;
    top: 0;
    height: 70px;
    width: 60px;
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
  aria-label='home button'
  class='home-button'
  on:click={handleOpen} 
  on:mouseover={() => { homeHover = true }}
  on:mouseout={() => { homeHover = false }} />
