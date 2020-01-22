<script>
  import { scrollPosition, screenHeight, screenWidth, backgroundHue } from './stores.js'
  import P5Canvas from './P5Canvas.svelte'

  let backgroundShapes = []

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas($screenWidth, $screenHeight)
      canvas.parent('about-background')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
	  }

	  p5.draw = () => {
      let scrollProgress = $scrollPosition / $screenHeight
      if (scrollProgress > 0) {
        const size = Math.random() * 1000
        const xCoordinate = Math.random() * $screenWidth - size / 2
        const yCoordinate = Math.random() * $screenHeight
        const opacity = 10000 / size
        console.log(size)
        const lightness = 115 - scrollProgress * 100
        p5.noStroke()
        p5.fill($backgroundHue, 50, lightness, opacity)
        p5.rect(xCoordinate, yCoordinate, size, size, 20)
      } else {
        p5.clear()
      }
    }

    p5.windowResized = () => {
      p5.resizeCanvas($screenWidth, $screenHeight)
    }
  }

</script>
<style>
  .about {
    position: relative;
    height: 100%;
    width: 100%;
  }

  #about-background {
    position: relative;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  
  .content {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    height: 100%;
    width: 100%;
  }

  h1 {
    color: white;
  }

  p { 
    color: white;
    width: 50%;
  }
</style>
<div class='about'>
  <div class='content'>
    <h1>who we are</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aliquam tempora excepturi qui. Cum autem magni voluptate assumenda cumque vitae porro, pariatur eos fugiat, tempore dolorum delectus, blanditiis illum numquam?</p>
  </div>
  <div id='about-background'>
    <P5Canvas sketch={sketch} />
  </div>
</div>