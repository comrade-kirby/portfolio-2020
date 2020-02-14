import {
  drawContainer,
  drawDivider,
  drawLabel,
  drawXIcon,
  eraseArea,
  getOpacity,
  transparentShape,
  transparentText
} from './helpers'

const drawInfoButton = (p5, width, height, infoParams) => {
  const hover = infoParams.hover
  const progress = infoParams.progress

  const containerWidth = 60
  const containerX = width - containerWidth
  const centerX = width - 30
  
  const titleY = 40
  const textBoxY = 1
  const iconY = 180
  const labelY = 210
  const dividerX = width - 60
  const dividerY = 219

  drawContainer(p5, containerWidth, height, containerX)
  drawControlTitle(p5, centerX, titleY, hover)
  drawTextBox(p5, width, height, textBoxY, progress)
  if (progress && hover) {
    drawXIcon(p5, centerX, iconY, progress)
  } else {
    drawInfoIcon(p5, centerX, iconY, hover)
  }
  drawLabel(p5, 'info', centerX, labelY, hover)
  drawDivider(p5, dividerX, dividerY, hover)
}

const drawControlTitle = (p5, x, y, hover) => {
  const verticalText = [...'canvas'].map(letter => letter + '\n').join('')
  transparentText(p5, {
    text: verticalText,
    textSize: 24,
    textLeading: 22,
    horizontalAlignment: p5.CENTER,
    xPosition: x,
    yPosition: y,
    hover: hover
  })
}

const drawTextBox = (p5, width, height, y, progress) => {
  const maxWidth = width - 60
  const maxRadius = 25

  const currentWidth = progress * maxWidth
  const currentRadius = progress * maxRadius
  const x = maxWidth - currentWidth
  
  eraseArea(p5, y, maxWidth, height)
  
  p5.noStroke()
  p5.fill(0, 0, 100)
  p5.rect(x, y, currentWidth, height - 3, currentRadius, 0, 0, currentRadius)
}

const drawInfoIcon = (p5, x, y, hover) => {
  const opacity = getOpacity(hover)
  const size = 25
  
  const circle = () => {
    p5.ellipse(x, y, size, size)
  }

  const options = { fill: true, opacity}
  transparentShape(p5, circle, options)
  drawLowerCaseI(p5, x, y)
}

const drawLowerCaseI = (p5, x, y) => {
  p5.strokeWeight(3)
  p5.strokeCap(p5.PROJECT)
  p5.stroke(0, 0, 100)
  p5.line(x, y, x, y + 6)
  p5.line(x, y - 5, x, y - 5)
}

export default drawInfoButton