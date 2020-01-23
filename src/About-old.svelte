<script>
  import { scrollPosition, screenHeight, screenWidth, backgroundHue } from './stores.js'
  import P5Canvas from './P5Canvas.svelte'

  let backgroundShapes = []

  const scrollProgress = () => $scrollPosition / $screenHeight

  const newShape = () => {
    const size = Math.random() * 1000
    const xCoordinate = Math.random() * $screenWidth - size / 2
    let yCoordinate = Math.random() * $screenHeight
    let offset = Math.random() * ($screenHeight / yCoordinate)
    yCoordinate += offset
    const opacity = (5000 / size) / 3
    const lightness = 115 - scrollProgress() * 100
    const newShape = {
      hue: $backgroundHue,
      lightness: lightness,
      opacity: opacity,
      x: xCoordinate,
      y: yCoordinate,
      size: size,
    }

    return newShape
  }
  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas($screenWidth, $screenHeight)
      canvas.parent('about-background')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
	  }

	  p5.draw = () => {
      // if (scrollProgress() > 0) {
        backgroundShapes.push(newShape())
        if (backgroundShapes.length > 3) { backgroundShapes.shift() }
        backgroundShapes.forEach(shape => {
          p5.noStroke()
          p5.fill(shape.hue, 50, shape.lightness, shape.opacity)
          p5.rect(shape.x, shape.y, shape.size, shape.size, 20)
        })
      // } else {
        // p5.clear()
      // }
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