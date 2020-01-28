<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from './P5Canvas.svelte'
  
  let aboutHeight
  let aboutWidth
  let name, email, message
  
  const drawContainer = (p5) => {
    p5.fill(0, 0, 100, 90)
    p5.noStroke()
    p5.rect(0, 0, aboutWidth, aboutHeight);
  }

  const drawTitle = (p5) => {
    let title = 'contact'
    p5.textSize(24)
    p5.textAlign(p5.LEFT, p5.TOP)
    p5.text(title, 20, 20, aboutWidth - 20, 30)
  }

  const drawContent = (p5) => {
    let content = 'this will be the contact page'
    p5.textSize(18)
    p5.textAlign(p5.RIGHT, p5.BOTTOM)
    p5.text(content, 100, 40, aboutWidth - 120, aboutHeight - 60)
  }

  const drawText = (p5) => {
    p5.textSize(24)
    p5.erase()
    drawTitle(p5)
    drawContent(p5)
    p5.noErase()
    p5.fill(0, 0, 0, 15)
    drawContent(p5)
    drawTitle(p5)
  }

  const drawLabels = (p5) => {
    const xPosition = 0
    const textWidth = aboutWidth * 0.30 - 20
    const textHeight = 20

    const namePosition = aboutHeight - 240
    const emailPosition = aboutHeight - 198
    const messagePosition = aboutHeight - 158

    p5.textSize(20)
    p5.textAlign(p5.RIGHT, p5.CENTER)
    
    p5.erase()
    p5.text('name', xPosition, namePosition, textWidth, textHeight)
    p5.text('email', xPosition, emailPosition, textWidth, textHeight)
    p5.text('message', xPosition, messagePosition, textWidth, textHeight)
    p5.noErase()

    p5.fill(0, 0, 0, 15)
    p5.text('name', xPosition, namePosition, textWidth, textHeight)
    p5.text('email', xPosition, emailPosition, textWidth, textHeight)
    p5.text('message', xPosition, messagePosition, textWidth, textHeight)
  }
  
  const drawSubmitButton = (p5) => {
    const rectWidth = aboutWidth * 0.70
    const rectHeight = 32
    const xPosition = aboutWidth - rectWidth - 20
    const yPosition = aboutHeight - 54
    p5.erase()
    p5.rect(xPosition, yPosition, rectWidth, rectHeight)
    p5.noErase()
    p5.fill(0, 0, 0, 15)
    p5.rect(xPosition, yPosition, rectWidth, rectHeight)


    p5.fill(50, 50, 100)
    p5.textSize(20)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.text('submit', xPosition, yPosition, rectWidth, rectHeight)
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(aboutWidth, aboutHeight)
      canvas.parent('contact')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      drawContainer(p5)
      drawText(p5)
      drawSubmitButton(p5)
      drawLabels(p5)

	  }

    p5.windowResized = () => {
      p5.resizeCanvas(aboutWidth, aboutHeight)
      drawContainer(p5)
      drawText(p5)
      drawSubmitButton(p5)
      drawLabels(p5)
    }
  }

  const submitForm = () => {
    var url = 'https://script.google.com/macros/s/AKfycbzRZDcDygipswfktZnpvNlzkZr95KF2YgPocqwkQg/exec'
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('success')
      }
    }
    xhr.send(JSON.stringify({name, email, message}))
  }

</script>
  
<style>
 #contact {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    width: 100%;
    bottom: 0;
    right: 0;
  }

  input, textarea {
    width: 70%;
    margin-right: 20px;
  }

  textarea {
    height: 100px;
  }

  button {
    margin: 0 20px 20px 0;
    width: 70%;
    align-self: flex-end;
    opacity: 0;
  }
</style>

<div id='contact'
  transition:fade
  bind:clientHeight={aboutHeight}
	bind:clientWidth={aboutWidth}
>
  <form>
      <input bind:value={name} type='text' name='name'>
      <input bind:value={email} type='text' name='email'>
      <textarea bind:value={message} name='message'></textarea>
    <button on:click|preventDefault={submitForm}>submit</button>
  </form>
  <P5Canvas sketch={sketch} />
</div>