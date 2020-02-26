<script>  
  import { tweened } from 'svelte/motion'
  import { cubicIn } from 'svelte/easing'
  import P5Canvas from '../../../P5Canvas.svelte'
  import { setupCanvas } from '../../../helpers'
  import drawResetButton from './drawResetButton'
  import { reset, screenSize } from '../../../stores'

  let hover = false
  let buttonHeight
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

    p5.windowResized = () => {
      p5.clear()
      p5.resizeCanvas(buttonWidth, buttonHeight)
      p5.redraw()
    }
  }

  $: buttonHeight = $screenSize == 'small' ? 50 : 70
</script>

<style>
  .reset-button {
    position: relative;   
    height: var(--height);
    width: 60px;
  }

  button {
    position: absolute;
    height: 100%;
    width: 100%;
    margin: 0;
    border: 0;
    padding: 0;
    z-index: 1;
    opacity: 0;
    pointer-events: all;
  }
</style>

<div 
  id='reset-button-canvas' 
  class='reset-button'
  style='--height:{buttonHeight}px'
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