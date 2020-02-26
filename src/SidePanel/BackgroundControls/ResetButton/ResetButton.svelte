<script>  
  import { tweened } from 'svelte/motion'
  import { cubicIn } from 'svelte/easing'
  import P5Canvas from '../../../P5Canvas.svelte'
  import { setupCanvas } from '../../../helpers'
  import drawResetButton from './drawResetButton'
  import { reset, screenSize } from '../../../stores'

  let hover = false
  const buttonHeight = 70
  const buttonWidth = 60
  const rotation = tweened(0, { duration: 500, easing: cubicIn })

  const handleClick = () => {
    rotation.set(0, { duration: 0 } )
    rotation.set(2 * Math.PI)
    reset.set(true)
  }


  const sketch = (p5) => {
    p5.setup = () => {
      setupCanvas(p5, buttonWidth, buttonHeight, 'reset-button-canvas')
    }

    p5.draw = () => {
      drawResetButton(p5, buttonWidth, buttonHeight, hover, $rotation, $screenSize)
    }
  }
</script>

<style>
  .reset-button {
    position: relative;
    height: 70px;
    width: 60px;
  }

  button {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    opacity: 0;
    pointer-events: all;
  }
</style>

<div 
  id='reset-button-canvas' 
  class='reset-button'
>
  <button 
    aria-label="reset button"
    on:click={handleClick}
    on:mouseover={() => {hover = true}}
    on:mouseout={() => {hover = false}}>
    reset
  </button>
  <P5Canvas sketch={sketch} />
</div>