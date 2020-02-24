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

const drawInfoButton = (p5, width, height, infoParams, smallDimensions, touch) => {
  const hover = infoParams.hover
  const progress = infoParams.progress

  const x = width - 30
  const titleY = 10
  const textBoxY = 1
  const iconY = height - 50
  const labelY = height - 20
  const dividerX = width - 60
  const dividerY = height - 1

  drawTextBox(p5, width, height, textBoxY, progress, smallDimensions, touch)
  drawControlTitle(p5, x, titleY, hover)
  if (progress && hover) {
    drawXIcon(p5, x, iconY, true, progress)
  } else {
    drawInfoIcon(p5, x, iconY, hover)
  }
  drawLabel(p5, 'info', x, labelY, hover)
  drawDivider(p5, dividerX, dividerY, hover)
}

const drawControlTitle = (p5, x, y, hover) => {
  const verticalText = [...'animation'].map(letter => letter + '\n').join('')
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

const drawTextBox = (p5, width, height, y, progress, smallDimensions, touch) => {
  const maxRadius = 25
  const currentRadius = progress * maxRadius
  const x = (width - 60) * (1 - progress)
  const pointer = touch ? 'touch' : 'mouse'
  const verb = touch ? 'press' : 'click'

  eraseArea(p5, y, width, height)
  drawTextBoxBackground(p5, x, y, width, height, currentRadius)
  
  if (progress) {
    const textSize = smallDimensions ? 10 : 12

    const infoWidth = width - (smallDimensions ? 80 : 80)
    const labelWidth = width - (smallDimensions ? 300 : 400)
    const descriptionWidth = width - (smallDimensions ? 100 : 180)
    
    const infoX = x + (smallDimensions ? 25 : 30)
    const labelX = x + (smallDimensions ? 15 : 40)
    const descriptionX = x + (smallDimensions ? 90 : 120)

    transparentText(p5, {
      text: `the animation behind moves for itself\n\nit reacts to your ${pointer} and can be modified with the controls below`,
      textSize: textSize,
      textLeading: 20,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: infoX,
      yPosition: 30,
      width: infoWidth,
      height: height - 30,
      progress: progress
    })
    // labels
    transparentText(p5, {
      text: "size -\nspeed -\nopac -\nfreq -",
      textSize: textSize,
      textLeading: 30,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.TOP,
      xPosition: labelX,
      yPosition: 125,
      width: labelWidth,
      height: height - 30,
      progress: progress
    })

    // descriptions
    transparentText(p5, {
      text: "size of shape\nrate of movement\nshape transparency\nfrequency of direction change",
      textSize: textSize,
      textLeading: 30,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: descriptionX,
      yPosition: 125,
      width: descriptionWidth,
      height: height - 40,
      progress: progress
    })

    transparentText(p5, {
      text: `${verb} and hold to pull towards ${pointer}`,
      textSize: textSize,
      textLeading: 20,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: infoX,
      yPosition: 250,
      width: infoWidth,
      height: height - 30,
      progress: progress
    })
  }
}

const drawTextBoxBackground = (p5, x, y, currentWidth, height, currentRadius) => {
  p5.noStroke()
  p5.fill(0, 0, 100, 90)
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