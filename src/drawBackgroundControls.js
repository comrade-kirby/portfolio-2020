import { controlsXOffset, primaryOpacity, hoverOpacity } from './constants.js'
import { drawContainer, transparentText } from './helpers'

const drawBackgroundControls = (p5, height, maximizeHover, buttonOptions) => {
  drawContainer(p5, 60, height, controlsXOffset)
  drawMaximizeTab(p5, maximizeHover)
  drawControlTitle(p5)

  buttonOptions.forEach(button => {
    drawControlButton(p5, button)
  })
}

  const drawMaximizeTab = (p5, maximizeHover) => {
    maximizeHover ? p5.stroke(0, 0, 0, 20) : p5.stroke(0, 0, 0, 15)

    p5.erase(0, 255)
    drawMaximizeIcon(p5)
    p5.line(controlsXOffset, 80, controlsXOffset + 60, 80)
    p5.noErase()

    p5.noFill()
    drawMaximizeIcon(p5)
    p5.line(controlsXOffset, 80, controlsXOffset + 60, 80)

    drawLabel(p5, controlsXOffset + 30, 60, maximizeHover)
  }

    const drawMaximizeIcon = (p5) => {
      const xPosition = controlsXOffset + 20
      const yPosition = 20

      p5.strokeWeight(2)
      p5.rect(xPosition, yPosition, 20, 20)
      p5.rect(xPosition + 5, yPosition + 5, 10, 10)
      p5.strokeCap(p5.PROJECT)
      p5.line(xPosition + 7, yPosition + 7, xPosition + 13, yPosition + 7)
    }

    const drawLabel = (p5, x, y, hover) => {
      transparentText(p5, {
        text: 'home',
        textSize: 16,
        horizontalAlignment: p5.CENTER,
        xPosition: x,
        yPosition: y,
        hover
      })
    }

  const drawControlTitle = (p5) => {
    const verticalText = [...'canvas'].map(letter => letter + '\n').join('')
    transparentText(p5, {
      text: verticalText,
      textSize: 24,
      textLeading: 22,
      horizontalAlignment: p5.CENTER,
      xPosition: controlsXOffset + 30,
      yPosition: 115
    })
  }

  const drawControlButton = (p5, options) => {
    const { text, type, value, yPosition, progress, hover } = options
    
    const defaultXPosition = controlsXOffset + 30
    
    // label
    transparentText(p5, {
      text: text,
      textSize: 16,
      horizontalAlignment: p5.CENTER,
      xPosition: defaultXPosition,
      yPosition: yPosition + 30,
      hover: hover,
    })

    
    
    if (hover && progress) { // X icon
      p5.strokeWeight(2)
      p5.stroke(0, 0, 0, progress * hoverOpacity)
      p5.erase(0, 255)
      p5.line(defaultXPosition - 10, yPosition - 10, defaultXPosition + 10, yPosition + 10)
      p5.line(defaultXPosition - 10, yPosition + 10, defaultXPosition + 10, yPosition - 10)
      p5.noErase()
      
      p5.noFill()
      p5.line(defaultXPosition - 10, yPosition - 10, defaultXPosition + 10, yPosition + 10)
      p5.line(defaultXPosition - 10, yPosition + 10, defaultXPosition + 10, yPosition - 10)
    } else if (value) { // value
      transparentText(p5, {
        text: (value * 100).toFixed(0),
        textSize: 16,
        horizontalAlignment: p5.CENTER,
        xPosition: defaultXPosition,
        yPosition: yPosition + 5,
        animate: true,
        progress: progress
      })
    }

    value 
      ? drawSlider(p5, yPosition, progress) 
      : drawTextBox(p5, yPosition, progress)
    
    drawIcon(p5, defaultXPosition, options)    
  }

    const drawSlider = (p5, yPosition, progress) => {
      const maxWidth = 240
      const maxRadius = 25
      const maxErase = 255
      const maxOpacity = primaryOpacity
      const currentWidth = progress * maxWidth
      const currentRadius = progress * maxRadius
      const currentErase = progress * maxErase 
      const currentOpacity = progress * maxOpacity 
      const xPosition = controlsXOffset - currentWidth
      
      p5.noStroke()
      p5.fill(0, 0, 100)
      p5.erase()
      p5.rect(controlsXOffset - 240, yPosition - 25, 240, 50)
      p5.noErase()
      
      p5.rect(xPosition, yPosition - 25, currentWidth, 50, currentRadius, 0, 0, currentRadius)
      
      p5.stroke(0)
      p5.strokeWeight(2)
      p5.erase(0, currentErase)
      p5.line(xPosition + 20, yPosition, controlsXOffset - 10, yPosition)
      p5.noErase()
      
      p5.stroke(0, 0, 0, currentOpacity)
      p5.line(xPosition + 20, yPosition, controlsXOffset - 10, yPosition)
    }

    const drawTextBox = (p5, yPosition, progress) => {
      const maxWidth = controlsXOffset
      const maxRadius = 25
      const maxOpacity = primaryOpacity

      const currentWidth = progress * maxWidth
      const currentRadius = progress * maxRadius
      const currentOpacity = progress * maxOpacity 
      const xPosition = maxWidth - currentWidth


      p5.noStroke()
      p5.fill(0, 0, 100)
      p5.erase()
      p5.rect(0, yPosition - 215, controlsXOffset, 240)
      p5.noErase()

      p5.rect(xPosition, yPosition - 215, currentWidth, 240, currentRadius, 0, 0, currentRadius)
    }

    const drawIcon = (p5, defaultXPosition, options) => {
      const { text, value, yPosition, progress, hover } = options
    
      const sliderLength = 210
      const sliderPosition = sliderLength - (value * sliderLength)
      const sliderIconPosition = (defaultXPosition) - progress * (40 + sliderPosition)
      const xPosition = value ? sliderIconPosition : defaultXPosition
    
      switch (text) {
        case 'info':
          drawInfoIcon(p5, xPosition, yPosition, hover, progress)
          break
        case 'size':
          drawSizeIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'pull':
          drawPullIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'opacity':
          drawOpacityIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'random':
          drawRandomIcon(p5, xPosition, yPosition, value, hover)
          break
      }
    }
      
      const drawInfoIcon = (p5, xPosition, yPosition, hover, progress) => {
        if (!hover || !progress) {
          const opacity = hover ? hoverOpacity : primaryOpacity
          const size = 25
          p5.noStroke()
          p5.erase()
          p5.ellipse(xPosition, yPosition, size, size)
          p5.noErase()
          
          p5.fill(0, 0, 0, opacity)
          p5.ellipse(xPosition, yPosition, size, size)
          
          p5.strokeWeight(3)
          p5.strokeCap(p5.PROJECT)
          p5.stroke(0, 0, 100)
          p5.line(xPosition, yPosition, xPosition, yPosition + 6)
          p5.line(xPosition, yPosition - 5, xPosition, yPosition - 5)
        }
      }

      const drawSizeIcon = (p5, xPosition, yPosition, value, hover) => {
        const maxSize = 25
        const size = value * maxSize
        drawCircle(p5, xPosition, yPosition, size, hover)
      }
  
      const drawPullIcon = (p5, xPosition, yPosition, value, hover) => {
        const maxDistance = 10
        const distance = (1 - value) * maxDistance
        
        const mouseX = xPosition - distance - 2
        const mouseY = yPosition + distance - 2
      
        const circleX = xPosition + distance
        const circleY = yPosition - distance
      
        drawCircle(p5, circleX, circleY, 20, hover)
        drawMouse(p5, mouseX, mouseY, hover)
      }

        const drawMouse = (p5, mouseX, mouseY, hover) => {
          const opacity = hover ? hoverOpacity : primaryOpacity
        
          p5.strokeCap(p5.ROUND)
          p5.strokeJoin(p5.MITER)
          
          p5.erase()
          p5.noStroke()
          p5.fill(0)
          p5.beginShape()
          p5.vertex(mouseX, mouseY)
          p5.vertex(mouseX + 9, mouseY + 4)
          p5.vertex(mouseX + 4, mouseY + 9)
          p5.endShape(p5.CLOSE)
          
          p5.stroke(0)
          p5.line(mouseX + 7, mouseY + 7, mouseX + 10, mouseY + 10)
          p5.noErase()
        
          p5.noStroke()
          p5.fill(0, 0, 0, opacity)
          p5.beginShape()
          p5.vertex(mouseX, mouseY)
          p5.vertex(mouseX + 9, mouseY + 4)
          p5.vertex(mouseX + 4, mouseY + 9)
          p5.endShape(p5.CLOSE)
        
          p5.stroke(0, 0, 0, opacity)
          p5.strokeWeight(2)
          p5.line(mouseX + 7, mouseY + 7, mouseX + 10, mouseY + 10)
        }

      const drawOpacityIcon = (p5, xPosition, yPosition, value, hover) => {
        const maxOpacity = 100
        const opacity = value * maxOpacity
        drawCircle(p5, xPosition, yPosition, 20, hover, opacity)
      }

      const drawRandomIcon = (p5, xPosition, yPosition, value, hover) => {
        const opacity = hover ? hoverOpacity : primaryOpacity
      
        const numberOfCircles = Math.ceil(value * 10)
        const coordinates = [
          [0, 0],
          [-8, -4],
          [6, 6],
          [3, -6],
          [-8, 2],
          [0, 4],
          [8, -2],
          [-4, -4],
          [6, 2],
          [-6, 6]
        ]
        p5.erase()
        p5.noFill()
        p5.rect(xPosition - 12, yPosition - 8, 24, 16)
        p5.noErase()
        p5.stroke(0, 0, 0, opacity)
        p5.rect(xPosition - 12, yPosition - 8, 24, 16)
        p5.fill(0, 0, 100)
        p5.noStroke()
        p5.rect(xPosition - 10, yPosition - 6, 20, 12)
      
        p5.strokeWeight(5)
        for (let i = 0; i < numberOfCircles; i++) {
          const x = xPosition + coordinates[i][0]
          const y = yPosition + coordinates[i][1]
          p5.stroke(0)
          p5.erase()
          p5.point(x, y)
          p5.noErase()
          p5.stroke(0, 0, 0, opacity)
          p5.point(x,y)
        } 
      
        if (value == 0) {
          p5.strokeWeight(2)
          p5.stroke(0)
          p5.erase()
          p5.line(xPosition - 5, yPosition + 10, xPosition + 5, yPosition - 10)
          p5.noErase()
          p5.stroke(0, 0, 0, opacity)
          p5.line(xPosition - 5, yPosition + 10, xPosition + 5, yPosition - 10)
        }
      }

      const drawCircle = (p5, xPosition, yPosition, size, hover, fillOpacity=0) => {
        const opacity = hover ? hoverOpacity : primaryOpacity
        // fill circle white
        p5.fill(0, 0, 100)
        p5.noStroke()
        p5.ellipse(xPosition, yPosition, size - 2)
        
        //erase 
        p5.strokeWeight(2)
        p5.stroke(0)
        p5.erase(fillOpacity, 255)
        p5.ellipse(xPosition, yPosition, size, size)
        p5.noErase()

        //fill circumfrence
        p5.noFill()
        p5.stroke(0, 0, 0, opacity)
        p5.ellipse(xPosition, yPosition, size, size)

        //white outline
        p5.stroke(0, 0, 100)
        p5.ellipse(xPosition, yPosition, size + 4, size + 4)
      }

export default drawBackgroundControls