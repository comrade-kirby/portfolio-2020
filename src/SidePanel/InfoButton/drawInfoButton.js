import {
  drawContainer,
  drawDivider,
  drawLabel,
  drawXIcon,
  getOpacity,
  transparentShape,
  transparentText
} from '../../helpers'

const drawInfoButton = (p5, width, height, infoParams, screenSize, touch) => {
  const hover = infoParams.hover
  const progress = infoParams.progress
  const small = screenSize == 'small'
  const x = width - 30
  const titleY = small ? 20 : 10
  const textBoxY = 1
  const iconY = height - (small ? 40 : 50)
  const labelY = height - 20
  const dividerX = width - 60
  const dividerY = height - 1

  drawTextBox(p5, width, height, textBoxY, progress, screenSize, touch)
  drawControlTitle(p5, x, titleY, hover, screenSize)
  if (progress && hover) {
    drawXIcon(p5, x, iconY, true, screenSize, progress)
  } else {
    drawInfoIcon(p5, x, iconY, hover, screenSize)
  }
  drawLabel(p5, 'info', x, labelY, hover, screenSize)
  drawDivider(p5, dividerX, dividerY, hover)
}

const drawControlTitle = (p5, x, y, hover, screenSize) => {
  const textSize = screenSize == 'small' ? 16 : 24
  const textLeading = screenSize == 'small' ? 16 : 22
  const verticalText = [...'animation'].map(letter => letter + '\n').join('')
  transparentText(p5, {
    text: verticalText,
    textSize,
    textLeading,
    verticalAlignment: p5.TOP,
    horizontalAlignment: p5.CENTER,
    xPosition: x,
    yPosition: y,
    hover: hover
  })
}

const drawTextBox = (p5, width, height, y, progress, screenSize, touch) => {
  const maxRadius = 25
  const currentRadius = progress * maxRadius
  const x = (width - 60) * (1 - progress)
  const pointer = touch ? 'touch' : 'mouse'
  const verb = touch ? 'press' : 'click'

  p5.clear()
  drawTextBoxBackground(p5, x, y, width, height, currentRadius)
  
  if (progress) {
    const large = screenSize == 'large'
    const small = screenSize == 'small'

    const textSize = large ? 12 : 10
    const infoWidth = width - (large ? 80 : 80)
    const infoX = x + 30
    const labelX = x + (large ? 110 : 90)
    const descriptionX = x + (large ? 120 : 100)
    const controlsLeading = small ? 20 : 30
    const controlsY = small ? 100 : 125
    const pullY = small ? 190 : 250

    transparentText(p5, {
      text: `the animation behind moves for itself\n\nit reacts to your ${pointer} and can be modified with the controls below`,
      textSize: textSize,
      textLeading: small ? 14 : 20,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: infoX,
      yPosition: 30,
      width: infoWidth,
      progress: progress
    })
    // labels
    transparentText(p5, {
      text: "size -\nspeed -\nopac -\nfreq -",
      textSize: textSize,
      textLeading : controlsLeading,
      horizontalAlignment: p5.RIGHT,
      verticalAlignment: p5.TOP,
      xPosition: labelX,
      yPosition: controlsY,
      progress: progress
    })

    // descriptions
    transparentText(p5, {
      text: "size of shape\nrate of movement\nshape transparency\nfrequency of direction change",
      textSize: textSize,
      textLeading: controlsLeading,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: descriptionX,
      yPosition: controlsY,
      progress: progress
    })

    //click to pull
    transparentText(p5, {
      text: `${verb} and hold to pull towards ${pointer}`,
      textSize: textSize,
      horizontalAlignment: p5.LEFT,
      verticalAlignment: p5.TOP,
      xPosition: infoX,
      yPosition: pullY,
      progress: progress
    })
  }
}

const drawTextBoxBackground = (p5, x, y, currentWidth, height, currentRadius) => {
  p5.noStroke()
  p5.fill(0, 0, 100, 90)
  p5.rect(x, y, currentWidth, height - 3, currentRadius, 0, 0, currentRadius)
}

const drawInfoIcon = (p5, x, y, hover, screenSize) => {
  const opacity = getOpacity(hover)
  const size = screenSize == 'small' ? 20 : 25
  
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