import { controlsXOffset, primaryOpacity, hoverOpacity } from './constants.js'
import { transparentText } from './helpers'

const drawCircle = (p5, xPosition, yPosition, size, hover, fillOpacity=0) => {
  const opacity = hover ? hoverOpacity : primaryOpacity
  // fill circle white
  p5.fill(0, 0, 100)
  p5.noStroke()
  p5.ellipse(xPosition, yPosition, size - 2)
  
  //erase 
  p5.strokeWeight(2)
  p5.stroke(0)
  p5.erase(100 * fillOpacity, 255)
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

const drawOpacityIcon = (p5, xPosition, yPosition, value, hover) => {
  const maxOpacity = 10
  const opacity = value * maxOpacity
  drawCircle(p5, xPosition, yPosition, 20, hover, value)
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
  const xPosition = maxWidth - currentWidth

  p5.erase()
  p5.rect(0, yPosition - 25, 240, 50)
  p5.noErase()

  p5.fill(0, 0, 100)
  p5.rect(xPosition, yPosition - 25, currentWidth, 50, currentRadius, 0, 0, currentRadius)
  
  p5.stroke(0)
  p5.erase(0, currentErase)
  p5.line(xPosition + 20, yPosition, 230, yPosition)
  p5.noErase()
  
  p5.stroke(0, 0, 0, currentOpacity)
  p5.line(xPosition + 20, yPosition, 230, yPosition)
}

const drawIcon = (p5, defaultXPosition, options) => {
  const { text, value, yPosition, progress, hover } = options

  const sliderLength = 210
  const sliderPosition = sliderLength - (value * sliderLength)
  const xPosition = (defaultXPosition) - progress * (40 + sliderPosition)

  switch (text) {
    case 'size':
      drawSizeIcon(p5, xPosition, yPosition, value, hover)
      break
    case 'pull':
      drawPullIcon(p5, xPosition, yPosition, value, hover)
      break
    case 'opacity':
      drawOpacityIcon(p5, xPosition, yPosition, value, hover)
      break
  }
}

const drawControlButton = (p5, options) => {
  const { text, value, yPosition, progress, hover } = options
  
  const defaultXPosition = controlsXOffset + 30
  
  transparentText(p5, {
    text: text,
    textSize: 16,
    horizontalAlignment: p5.CENTER,
    xPosition: defaultXPosition,
    yPosition: yPosition + 30,
    hover: hover,
  })

  transparentText(p5, {
    text: value * 100,
    textSize: 16,
    horizontalAlignment: p5.CENTER,
    xPosition: defaultXPosition,
    yPosition: yPosition + 5,
    animate: true,
    progress: progress
  })

  drawSlider(p5, yPosition, progress)
  drawIcon(p5, defaultXPosition, options)
}

export default drawControlButton