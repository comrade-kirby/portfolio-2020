import { primaryOpacity, hoverOpacity } from './constants'

export const transparentText = (p5, options) => {
  const { 
    text,
    textSize,
    textLeading,
    horizontalAlignment,
    verticalAlignment,
    xPosition,
    yPosition,
    width,
    height,
    hover,
    progress
  } = options

  let erase = 255
  let opacity = hover ? hoverOpacity : primaryOpacity
  if (progress) { 
    erase = progress * erase
    opacity = progress * opacity
  }

  p5.textSize(textSize)
  p5.textLeading(textLeading)
  p5.textAlign(horizontalAlignment, verticalAlignment)
  p5.fill(0)
  p5.noStroke()
  
  p5.erase(erase)
  p5.text(text, xPosition, yPosition, width, height)
  p5.noErase()
  
  p5.fill(0, 0, 0, opacity)
  p5.text(text, xPosition, yPosition, width, height)
}

export const transparentTitle = (p5, text) => {
  transparentText(p5, {
    text: text,
    textSize: 24,
    horizontalAlignment: p5.LEFT,
    verticalAlignment: p5.TOP,
    xPosition: 20,
    yPosition: 20,
  })
}

export const drawContainer = (p5, width, height, xPosition = 0) => { 
  p5.fill(0, 0, 100, 90)
  p5.noStroke()
  p5.rect(xPosition, 0, width, height)
}

export const drawMinimizeButton = (p5, width, hover) => {
  const xPosition = width - 40
  const yPosition = 20
  const opacity = hover ? hoverOpacity : primaryOpacity

  p5.strokeWeight(2)
  p5.stroke(0, 0, 0, opacity)
  p5.erase(0, 255)
  p5.line(xPosition + 15, yPosition + 5, xPosition + 15, yPosition + 12)
  p5.rect(xPosition, yPosition, 20, 20)
  p5.noErase()
  
  p5.noFill()
  p5.line(xPosition + 15, yPosition + 5, xPosition + 15, yPosition + 12)
  p5.rect(xPosition, yPosition, 20, 20)
}