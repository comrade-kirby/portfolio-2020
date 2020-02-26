import { 
  drawContainer,
  drawDivider,
  drawLabel,
  getOpacity,
  transparentShape, 
} from '../../helpers'

const drawHomeButton = (p5, width, height, hover, screenSize) => {
  const iconX = width / 2
  const iconY = 25
  const labelX = width / 2
  const labelY = height - 20
  const dividerX = 0
  const dividerY = height - 1
  
  p5.clear()
  drawContainer(p5, width, height)
  drawMaximizeIcon(p5, iconX, iconY, hover)
  drawLabel(p5, 'home', labelX, labelY, hover, screenSize)
  drawDivider(p5, dividerX, dividerY, hover)
}

const drawMaximizeIcon = (p5, x, y, hover) => {
  const opacity = getOpacity(hover)

  p5.strokeWeight(2)
  p5.strokeCap(p5.PROJECT)
  p5.rectMode(p5.CENTER)
  const maximizeIcon = () => {
    p5.rect(x, y, 20, 20)
    p5.line(x - 8, y - 6, x + 8, y - 6)
  }
  
  const options = { stroke: true, opacity }
  transparentShape(p5, maximizeIcon, options)
  p5.rectMode(p5.CORNER)
}

export default drawHomeButton