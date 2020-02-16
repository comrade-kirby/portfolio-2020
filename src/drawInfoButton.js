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
  
  const titleY = 10
  const textBoxY = 1
  const iconY = 170
  const labelY = 200
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
    verticalAlignment: p5.TOP,
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
  drawTextBoxBackground(p5, x, y, currentWidth, height, currentRadius)
  
  if (progress) {
    transparentText(p5, {
      text: "the sliders below modify the animation",
      textSize: 12,
      textLeading: 32,
      horizontalAlignment: p5.CENTER,
      verticalAlignment: p5.TOP,
      xPosition: x + 20,
      yPosition: 40,
      width: maxWidth - 30,
      height: 80,
      progress: progress
    })

    // labels
    transparentText(p5, {
      text: "size -\npull -\nthin -\nauto -",
      textSize: 12,
      textLeading: 32,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.TOP,
      xPosition: x + 40,
      yPosition: 75,
      width: maxWidth - 340,
      height: height - 40,
      progress: progress
    })

    // descriptions
    transparentText(p5, {
      text: "size of shapes\nattraction to cursor\nshape transparenty\nfrequency of simulated movement",
      textSize: 12,
      textLeading: 32,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: x + 120,
      yPosition: 75,
      width: maxWidth - 120,
      height: height - 40,
      progress: progress
    })
  }
}

const drawTextBoxBackground = (p5, x, y, currentWidth, height, currentRadius) => {
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