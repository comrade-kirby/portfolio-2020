<script>
  import { fade } from 'svelte/transition'

  import P5Canvas from './P5Canvas.svelte'
  import { closeHover } from './stores.js'
  import {
    drawCloseButton,
    drawContainer,
    eraseArea,
    transparentText,
    transparentTitle,
    setupCanvas
  } from './helpers.js'

  let contactHeight, contactWidth, name, email, message, honeypot, errorMessage
  let hover = false
  let messageSent = false
  let sending = false

  const drawThankyou = (p5) => {
    transparentText(p5, {
      text: "Thanks! We'll reach out soon :)",
      textSize: 18,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.BOTTOM,
      xPosition: 100,
      yPosition: 40,
      width: contactWidth - 120,
      height: contactHeight - 60
    })
  }

  const drawLabels = (p5) => {
    const textWidth = contactWidth * 0.30 - 20

    p5.textSize(20)
    p5.textAlign(p5.RIGHT, p5.CENTER)
    
    transparentText(p5, {
      text: 'name',
      xPosition: 0,
      yPosition: contactHeight - 240,
      width: textWidth,
      height: 20
    })
    transparentText(p5, {
      text: 'email',
      xPosition: 0,
      yPosition: contactHeight - 198,
      width: textWidth,
      height: 20
    })
    transparentText(p5, {
      text: 'message',
      xPosition: 0,
      yPosition: contactHeight - 158,
      width: textWidth,
      height: 20
    })
  }
  
  const drawSubmitButton = (p5) => {
    const rectWidth = contactWidth * 0.70
    const rectHeight = 32
    const xPosition = contactWidth - rectWidth - 20
    const yPosition = contactHeight - 54
    p5.erase()
    p5.rect(xPosition, yPosition, rectWidth, rectHeight)
    p5.noErase()
    hover ? p5.fill(0, 0, 0, 20) : p5.fill(0, 0, 0, 15)
    p5.rect(xPosition, yPosition, rectWidth, rectHeight)

    const buttonText = sending ? '...' : 'submit'

    p5.fill(50, 50, 100)
    p5.noStroke()
    p5.textSize(20)
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.text(buttonText, xPosition, yPosition, rectWidth, rectHeight)
  }

  const drawErrorMessage = (p5) => {
    const rectWidth = contactWidth * 0.70
  
    transparentText(p5, {
      text: errorMessage,
      textSize: 14,
      horizontalAlignment: p5.CENTER,
      verticalAlignment: p5.CENTER,
      xPosition: contactWidth - rectWidth - 20,
      yPosition: contactHeight - 25,
      width: contactWidth * 0.70,
      height: 32
    })
  }

  const sketch = (p5) => {
	  p5.setup = () => {
      setupCanvas(p5, contactWidth, contactHeight, 'contact')
      p5.frameRate(10)
	  }

    p5.draw = () => {
      eraseArea(p5, 0, contactWidth, contactHeight)
      drawContainer(p5, contactWidth, contactHeight)
      transparentTitle(p5, 'contact')
      drawCloseButton(p5, contactWidth, $closeHover)
      if (!messageSent) {
        drawLabels(p5)
        drawSubmitButton(p5)
      } else {
        drawThankyou(p5)
      }
      if (errorMessage) { drawErrorMessage(p5) }
    }

    p5.windowResized = () => {
      p5.resizeCanvas(contactWidth, contactHeight)
      p5.redraw()
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
  bind:clientHeight={contactHeight}
	bind:clientWidth={contactWidth}
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