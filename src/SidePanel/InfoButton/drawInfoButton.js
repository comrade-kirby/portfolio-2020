import {
  drawContainer,
  drawDivider,
  drawLabel,
  drawXIcon,
  eraseArea,
  getOpacity,
  transparentShape,
  transparentText
} from '../../helpers'

const drawInfoButton = (p5, width, height, infoParams, smallDimensions) => {
  const hover = infoParams.hover
  const progress = infoParams.progress

  const titleX = 30 + (progress * (width - 60))
  const titleY = 10
  const textBoxY = 1
  const iconY = 170
  const labelY = 200
  const dividerX = (progress * (width - 60))
  const dividerY = 219

  drawContainer(p5, width, height)
  drawTextBox(p5, width, height, textBoxY, progress, smallDimensions)
  drawControlTitle(p5, titleX, titleY, hover)
  if (progress && hover) {
    drawXIcon(p5, titleX, iconY, true, progress)
  } else {
    drawInfoIcon(p5, titleX, iconY, hover)
  }
  drawLabel(p5, 'info', titleX, labelY, hover, smallDimensions)
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

const drawTextBox = (p5, width, height, y, progress, smallDimensions) => {
  const maxWidth = width - 60
  const maxRadius = 25
  const currentRadius = progress * maxRadius
  
  eraseArea(p5, y, maxWidth, height)
  drawTextBoxBackground(p5, y, maxWidth, height, currentRadius)
  
  if (progress) {
    const textSize = smallDimensions ? 10 : 12
    const headerWidth = maxWidth - (smallDimensions ? 0 : 30)
    const labelWidth = maxWidth - (smallDimensions ? 260 : 340)
    const descriptionWidth = maxWidth - (smallDimensions ? 40 : 120)
    
    const headerX = smallDimensions ? 5 : 20
    const labelX = smallDimensions ? 25 : 40
    const descriptionX = smallDimensions ? 80 : 120

    transparentText(p5, {
      text: "the sliders below modify the animation",
      textSize: textSize,
      textLeading: 32,
      horizontalAlignment: p5.CENTER,
      verticalAlignment: p5.TOP,
      xPosition: headerX,
      yPosition: 40,
      width: headerWidth,
      height: 80,
      progress: progress
    })

    // labels
    transparentText(p5, {
      text: "size -\npull -\nthin -\nauto -",
      textSize: textSize,
      textLeading: 32,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.TOP,
      xPosition: labelX,
      yPosition: 75,
      width: labelWidth,
      height: height - 40,
      progress: progress
    })

    // descriptions
    transparentText(p5, {
      text: "size of shapes\nattraction to cursor\nshape transparenty\nfrequency of simulated movement",
      textSize: textSize,
      textLeading: 32,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: descriptionX,
      yPosition: 75,
      width: descriptionWidth,
      height: height - 40,
      progress: progress
    })
  }
}

const drawTextBoxBackground = (p5, y, currentWidth, height, currentRadius) => {
  p5.noStroke()
  p5.fill(0, 0, 100)
  p5.rect(0, y, currentWidth, height - 3, currentRadius, 0, 0, currentRadius)
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