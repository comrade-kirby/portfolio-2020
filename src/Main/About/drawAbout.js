import { 
  closeButtonMargin,
  drawContainer,
  drawXIcon,
  transparentText,
  transparentTitle,
} from '../../helpers.js'

const drawAbout = (p5, aboutWidth, aboutHeight, screenSize, closeHover) => {
  p5.clear()
  drawContainer(p5, aboutWidth, aboutHeight)
  transparentTitle(p5, "who aM i? what is this?", screenSize)
  drawContent(p5, aboutWidth, screenSize)
  const margin = closeButtonMargin(screenSize)
  drawXIcon(p5, aboutWidth - margin, margin, closeHover, screenSize)
}

  const drawContent = (p5, aboutWidth, screenSize) => {
    let textSize, x
    let bold = false
    if (screenSize == 'large') { 
      textSize = 16 
      x = 85
    } else if (screenSize == 'medium') { 
      textSize = 12 
      x = 50
    } else { 
      textSize = 10 
      x = 30
      bold = true
    }
      
    const y = aboutWidth < 400 ? 50 : 90
    
    const iAmText = "i am:\n\t- an engineer, artist, and designer\n\t- transparent, compassionate, curious\n\t- passionate about:\n\t\t- empowerment\n\t\t- accessibilty\n\t\t- education\n\t- human and need money to survive\n\t- working to create balance"
    const thisIsText = "\n\nthis is:"
    const thisIsL1P1 = "\n\t- a generative art experience"
    const thisIsL1P2 = "and portfolio"
    const thisIsL2P1 = "\n\t- an opportunity to play"
    const thisIsL2P2 = "(for you and me)"
    const thisIsL3P1 = "\n\t- an animation and interaction"
    const thisIsL3P2 = "design flex"
    const thisIsL4 = "\n\t- a work in progress :)"
    const text = aboutWidth < 400 
      ? `${iAmText}${thisIsText}${thisIsL1P1}\n\t\t${thisIsL1P2}${thisIsL2P1}\n\t\t${thisIsL2P2}${thisIsL3P1}\n\t\t${thisIsL3P2}${thisIsL4}`
      : `${iAmText}${thisIsText}${thisIsL1P1} ${thisIsL1P2}${thisIsL2P1} ${thisIsL2P2}${thisIsL3P1} ${thisIsL3P2}${thisIsL4}`
    transparentText(p5, {
      text: text,
      textSize: textSize,
      textLeading: 24,
      bold,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: x,
      yPosition: y
    })
  }

export default drawAbout