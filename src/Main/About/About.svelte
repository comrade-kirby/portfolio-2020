<script>
  import { fade } from 'svelte/transition'
  
  import P5Canvas from '../../P5Canvas.svelte'
  import drawAbout from './drawAbout'
  import { closeHover, screenSize } from '../../stores.js'
  import { setupCanvas } from '../../helpers.js'
  
  let aboutHeight, aboutWidth

  const sketch = (p5) => {
	  p5.setup = () => {
      setupCanvas(p5, aboutWidth, aboutHeight, 'about')
      p5.frameRate(10)
    }
    
    p5.draw = () => {
      drawAbout(p5, aboutWidth, aboutHeight, $screenSize, $closeHover)
    }

    p5.windowResized = () => {
      p5.resizeCanvas(aboutWidth, aboutHeight)
      p5.redraw()
    }
  }
</script>
  
<style>
 #about {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>

<div id='about'
  transition:fade
  bind:clientHeight={aboutHeight}
	bind:clientWidth={aboutWidth}
>
  <div class='screen-reader-content'>
    <h2>Who am I? What is this?</h2>
    <h3>I am:</h3>
    <ul>
      <li>an engineer, artist, and designer</li>
      <li>transparent, compassionate, curious</li>
      <li>passionate about empowerment, accessibilty, and education</li>
      <li>human and need money to survive</li>
      <li>working to create balance</li>
    </ul>
    <h3>This is:</h3>
    <ul>
      <li>a generative art experienceand and portfolio</li>
      <li>an opportunity to play (for you and me)</li>
      <li>an animation and interaction design flex</li>
      <li>a work in progress :)</li>
    </ul>
  </div>
  <P5Canvas sketch={sketch} />
</div>