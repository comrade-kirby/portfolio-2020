<script>
  import P5Canvas from '../../P5Canvas.svelte'
  import drawHomeButton from './drawHomeButton'
  import { setupCanvas } from '../../helpers'
  import {
    open,
    currentView,
    screenSize,
    infoProgress,
    sizeProgress,
    speedProgress,
    opacityProgress,
    frequencyProgress 
  } from '../../stores'

  let homeButtonWidth
  const homeButtonHeight = 70
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
      drawHomeButton(p5, homeButtonWidth, homeButtonHeight, homeHover, $screenSize)
    }

    p5.windowResized = () => {
      p5.clear()
      p5.resizeCanvas(homeButtonWidth, homeButtonHeight)
      p5.redraw()
    }
  }

</script> 

<style>
  #home-button-canvas-container {
    width: 60px;
    min-height: var(--height);
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
  bind:clientWidth={homeButtonWidth}
  style='--height:{homeButtonHeight}px'
>
  <P5Canvas sketch={sketch}/>
</div>
<button
  aria-label='home button'
  class='home-button'
  on:click={handleOpen} 
  on:mouseover={() => { homeHover = true }}
  on:mouseout={() => { homeHover = false }} />
