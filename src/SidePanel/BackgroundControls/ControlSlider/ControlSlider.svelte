<script>  
  import P5Canvas from '../../../P5Canvas.svelte'
  import { smallDimensions } from '../../../stores'
  import { setupCanvas } from '../../../helpers'
  import drawControlSlider from './drawControlSlider'

  export let button
  export let progress
  let hover = false
  let sliderWidth = 300
  let sliderHeight = 70
  let buttonXOffset

  const handleClick = () => {
    if (progress == 0) {
      button.progressWritable.set(1)
    } else {
      button.progressWritable.set(0)
    }
  }

  const slideSlider = (progress) => {
    buttonXOffset = (60 - sliderWidth) * (1 - progress)
  }

  const sketch = (p5) => {
    p5.setup = () => {
      setupCanvas(p5, sliderWidth, sliderHeight, `${button.text}-canvas`)
      p5.frameRate(10)
    }

    p5.draw = () => {
      drawControlSlider(p5, sliderWidth, sliderHeight, button, smallDimensions)
    }
  }
  $: button.hover = hover
  $: slideSlider(progress)
</script>

<style>
  .control-slider {
    position: relative;
    right: var(--buttonXOffset);
    height: 70px;
    width: 300px;
    background-color: green;
  }

  button {
    position: absolute;
    margin: 0;
    /* right: 0; */
    height: 100%;
    width: 100%;
    opacity: 0.5;
  }

</style>

<div 
  id='{button.text}-canvas' 
  class='control-slider'
  style='--buttonXOffset:{buttonXOffset}px'
  >
  <button 
    on:click={handleClick}
    on:mouseover={() => {hover = true}}
    on:mouseout={() => {hover = false}} 
  />
  <P5Canvas sketch={sketch} />
</div>