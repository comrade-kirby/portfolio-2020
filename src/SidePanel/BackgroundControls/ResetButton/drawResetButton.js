import { drawLabel, drawContainer, getOpacity, transparentShape } from '../../../helpers'

export const drawResetButton = (p5, width, height, hover, rotation, screenSize) => {
  const small = screenSize == 'small'
  const text = 'reset'
  const x = width - 30
  const y = small ? 45 : 55
  p5.clear()
  drawContainer(p5, width, height)
  drawLabel(p5, text, x, y, hover, screenSize)
  drawResetIcon(p5, x, hover, rotation, small) 
}
  
  const drawResetIcon = (p5, x, hover, rotation, small) => {
    const opacity = getOpacity(hover)
    const size = small ? 18 : 20 
    const y = 25
    const startRadians = p5.QUARTER_PI
    const stopRadians = (2 * p5.PI) - p5.QUARTER_PI
    p5.strokeWeight(2)
    p5.translate(x, y)
    p5.rotate(rotation, [x, y])
    
    const resetIcon = () => {
      p5.arc(0, 0, 20, 20, startRadians, stopRadians)
      p5.triangle(6, -2, 9, -7, 11, -2);
    }

    const iconOptions = { stroke: true, opacity }
    transparentShape(p5, resetIcon, iconOptions)
  }
      
export default drawResetButton