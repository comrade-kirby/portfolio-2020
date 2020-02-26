import { 
  drawContainer,
  drawDivider,
  drawLabel,
  getOpacity,
  transparentShape, 
} from '../../helpers'

const drawHomeButton = (p5, width, height, hover, screenSize) => {
  const small = screenSize == 'small'

  const iconX = width / 2
  const iconY = small ? 30 : 25
  const labelX = width / 2
  const labelY = height - (small ? 20 : 20)
  const dividerX = 0
  const dividerY = height - 1
  
  p5.clear()
  drawContainer(p5, width, height)
  drawMaximizeIcon(p5, iconX, iconY, hover, small)
  drawLabel(p5, 'home', labelX, labelY, hover, screenSize)
  drawDivider(p5, dividerX, dividerY, hover)
}

const drawMaximizeIcon = (p5, x, y, hover, small) => {
  const opacity = getOpacity(hover)
  const rectSize = small ? 16 : 20
  const lineX = small ? 6 : 8
  const lineY = small ? 4 : 6
  p5.strokeWeight(2)
  p5.strokeCap(p5.PROJECT)
  p5.rectMode(p5.CENTER)
  
  const maximizeIcon = () => {
    p5.rect(x, y, rectSize, rectSize)
    p5.line(x - lineX, y - lineY, x + lineX, y - lineY)
  }
  
  const options = { stroke: true, opacity }
  transparentShape(p5, maximizeIcon, options)
  p5.rectMode(p5.CORNER)
}

export default drawHomeButton