<script>
  import { fade } from 'svelte/transition'
  import P5Canvas from './P5Canvas.svelte'
  
  let aboutHeight, aboutWidth, name, email, message, honeypot, errorMessage
  let hover = false
  let messageSent = false
  let sending = false
  
  const drawContainer = (p5) => {
    p5.fill(0, 0, 100, 90)
    p5.noStroke()
    p5.rect(0, 0, aboutWidth, aboutHeight);
  }

  const drawTitle = (p5) => {
    let title = 'contact'
    p5.textSize(24)
    p5.textAlign(p5.LEFT, p5.TOP)
    p5.erase()
    p5.text(title, 20, 20, aboutWidth - 20, 30)
    p5.noErase()
    p5.fill(0, 0, 0, 15)
    p5.text(title, 20, 20, aboutWidth - 20, 30)
  }

  const drawThankyou = (p5) => {
    let content = "Thanks! We'll reach out soon :)"
    p5.textSize(18)
    p5.textAlign(p5.RIGHT, p5.BOTTOM)
    p5.erase()
    p5.text(content, 100, 40, aboutWidth - 120, aboutHeight - 60)
    p5.noErase()
    p5.fill(0, 0, 0, 15)
    p5.text(content, 100, 40, aboutWidth - 120, aboutHeight - 60)
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
    hover ? p5.fill(0, 0, 0, 20) : p5.fill(0, 0, 0, 15)
    p5.rect(xPosition, yPosition, rectWidth, rectHeight)

    const buttonText = sending ? '...' : 'submit'

    p5.fill(50, 50, 100)
    p5.textSize(20)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.text(buttonText, xPosition, yPosition, rectWidth, rectHeight)
  }

  const drawErrorMessage = (p5) => {
    const rectWidth = aboutWidth * 0.70
    const width = aboutWidth * 0.70
    const height = 32
    const xPosition = aboutWidth - rectWidth - 20
    const yPosition = aboutHeight - 25
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.textSize(14)
    p5.erase()
    p5.text(errorMessage, xPosition, yPosition, width, height)
    p5.noErase()
    p5.fill(0, 0, 0, 15)
    p5.text(errorMessage, xPosition, yPosition, width, height)
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      const canvas = p5.createCanvas(aboutWidth, aboutHeight)
      canvas.parent('contact')
      p5.colorMode(p5.HSL, 360, 100, 100, 100)
      p5.frameRate(10)
	  }

    p5.draw = () => {
      drawContainer(p5)
      drawTitle(p5)
      if (!messageSent) {
        drawSubmitButton(p5)
        drawLabels(p5)
      } else {
        drawThankyou(p5)
      }
      if (errorMessage) { drawErrorMessage(p5) }
    }

    p5.windowResized = () => {
      p5.resizeCanvas(aboutWidth, aboutHeight)
    }
  }

  const setErrorMessage = () => {
    let newMessage = []
    if (!name) { newMessage.push('name is required')}
    if (!email) { newMessage.push('email is required')}
    if (!message) { newMessage.push('message is required')}

    errorMessage = newMessage.join(', ')
  }

  const submitForm = () => {
    if (name && email && message && !honeypot && !sending) {
      sending = true
      var url = 'https://script.google.com/macros/s/AKfycbzRZDcDygipswfktZnpvNlzkZr95KF2YgPocqwkQg/exec'
      var xhr = new XMLHttpRequest()
      xhr.open('POST', url)
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("sent")
          messageSent = true
        } else if (xhr.status !== 200) {
          errorMessage = 'oops, something went wrong'
        }
        sending = false
      }
      xhr.send(JSON.stringify({name, email, message}))
    } else {
      setErrorMessage()
    }
  }
</script>
  
<style>
 #contact {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    min-height: 300px;
    min-width: 375px;
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
    resize: none;
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
  {#if !messageSent}
    <form>
        <input bind:value={name} type='text' name='name'>
        <input bind:value={email} type='email' name='email'>
        <input bind:value={honeypot} type="hidden" name='honeypot'>
        <textarea bind:value={message} name='message'></textarea>
      <button 
        on:click|preventDefault={submitForm}
        on:mouseover={() => { hover = true }}
        on:mouseout={() => { hover = false }}
      >
        submit
      </button>
    </form>
  {/if}
  <P5Canvas sketch={sketch} />
</div>