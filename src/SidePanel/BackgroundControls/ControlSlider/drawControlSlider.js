import {
  drawContainer,
  drawDivider,
  drawLabel,
  drawXIcon,
  eraseArea,
  getOpacity,
  transparentShape,
  transparentText
} from '../../../helpers'

export const drawControlSlider = (p5, width, height, button, smallDimensions) => {
  const containerWidth = 300
  drawControlButton(p5, width, button, smallDimensions)
}

  const drawControlButton = (p5, width, button, smallDimensions) => {
    const { text, value, progress, hover } = button
    const x = 30 + (progress * (width - 60))
    const valueY = 30
    const labelY = 60
    const sliderY = 0

    drawSlider(p5, width, sliderY, progress)
    drawLabel(p5, text, x, labelY, hover, smallDimensions)
    if (hover && progress) {
      drawXIcon(p5, x, valueY, true, progress)
    } else if (progress) {
      transparentText(p5, {
        text: (value * 100).toFixed(0),
        textSize: 16,
        horizontalAlignment: p5.CENTER,
        xPosition: x,
        yPosition: valueY
      })
    }

    drawIcon(p5, x, button)    
  }

    const drawSlider = (p5, width, y, progress) => {
      const backgroundX = 0
      const backgroundY = y
      const backgroundHeight = 70
      const lineX = backgroundX + 20
      const lineY = y + 35

      eraseArea(p5, backgroundY, width, backgroundHeight)
      drawSliderBackground(p5, backgroundX, backgroundY, width, backgroundHeight, progress)
      drawSliderLine(p5, lineX, lineY, width, progress) 
    }

      const drawSliderBackground = (p5, x, y, width, height, progress) => {
        const maxRadius = 35
        const currentRadius = progress * maxRadius

        p5.fill(0, 0, 100, 90)
        p5.rect(x, y, width, height, currentRadius, 0, 0, currentRadius)
      }

      const drawSliderLine = (p5, xPosition, yPosition, width, progress) => {
        const maxOpacity = getOpacity()
        const currentOpacity = progress * maxOpacity 
        const lineEndX = width - 70
        p5.strokeWeight(2)
        const line = () => {
          p5.line(xPosition, yPosition, lineEndX, yPosition)
        }
  
        const lineOptions = { stroke: true, progress, opacity: currentOpacity }
        transparentShape(p5, line, lineOptions)
      }

    const drawIcon = (p5, x, button) => {
      const { text, value, progress, hover } = button
    
      const yPosition = 35
      const sliderLength = 210
      const sliderPosition = sliderLength - (value * sliderLength)
      const sliderIconPosition = (x) - progress * (40 + sliderPosition)
      const xPosition = sliderIconPosition
    
      switch (text) {
        case 'size':
          drawSizeIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'pull':
          drawPullIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'thin':
          drawThinIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'auto':
          drawAutoIcon(p5, xPosition, yPosition, value, hover)
          break
      }
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

        const drawMouse = (p5, mouseX, mouseY, hover) => {
          const opacity = getOpacity(hover)
        
          p5.strokeCap(p5.ROUND)
          p5.strokeJoin(p5.MITER)
          
          const pointer = () => {
            p5.strokeWeight(0)
            p5.beginShape()
            p5.vertex(mouseX, mouseY)
            p5.vertex(mouseX + 9, mouseY + 4)
            p5.vertex(mouseX + 4, mouseY + 9)
            p5.endShape(p5.CLOSE)
            p5.strokeWeight(2)
            p5.line(mouseX + 7, mouseY + 7, mouseX + 10, mouseY + 10)
          }

          const options = { stroke: true, fill: true, opacity }
          transparentShape(p5, pointer, options)
        }

      const drawThinIcon = (p5, xPosition, yPosition, value, hover) => {
        const maxOpacity = 100
        const opacity = value * maxOpacity
        drawCircle(p5, xPosition, yPosition, 20, hover, opacity)
      }

      const drawAutoIcon = (p5, xPosition, yPosition, value, hover) => {
        const opacity = getOpacity(hover)
      
        
        drawOutline(p5, xPosition, yPosition, opacity) 
        drawDots(p5, xPosition, yPosition, value, opacity)
        
      
        if (value == 0) {
          drawSlash(p5, xPosition, yPosition, opacity)
        }
      }

        const drawOutline = (p5, xPosition, yPosition, opacity) => {
          const rectOutline = () => {
            p5.rect(xPosition - 12, yPosition - 8, 24, 16)
          }
          const options = { stroke: true, opacity }
          transparentShape(p5, rectOutline, options)

          p5.fill(0, 0, 100, 90)
          p5.noStroke()
          p5.rect(xPosition - 11, yPosition - 6, 22, 12) // fill white
        }

        const drawDots = (p5, xPosition, yPosition, value, opacity) => {
          const numberOfCircles = Math.ceil(value * 10)
          const coordinates = [
            [0, 0],
            [-8, -4],
            [6, 6],
            [3, -6],
            [-8, 2],
            [0, 4],
            [8, -2],
            [-4, -4],
            [6, 2],
            [-6, 6]
          ]

          for (let i = 0; i < numberOfCircles; i++) {
            const x = xPosition + coordinates[i][0]
            const y = yPosition + coordinates[i][1]
            
            p5.strokeWeight(5)
            const dot = () => {
              p5.point(x, y)
            }

            const options = { stroke: true, opacity }
            transparentShape(p5, dot, options)
          } 
        }

        const drawSlash = (p5, xPosition, yPosition, opacity) => {
          p5.strokeWeight(2)
          const slash = () => {
            p5.line(xPosition - 5, yPosition + 10, xPosition + 5, yPosition - 10)
          }

          const options = { stroke: true, opacity }
          transparentShape(p5, slash, options)
        }

      const drawCircle = (p5, xPosition, yPosition, size, hover, fillOpacity=0) => {
        const opacity = getOpacity(hover)
        
        // transparent circle
        const circle = () => {
          p5.ellipse(xPosition, yPosition, size, size)
        }
        const outlineOptions = { fill: true, opacity }
        transparentShape(p5, circle, outlineOptions)
        
        // white -> transparent fill
        p5.noStroke()
        p5.fill(0, 0, 100, 100 - fillOpacity)
        p5.ellipse(xPosition, yPosition, size - 4 , size - 4 )

        // white outline
        p5.stroke(0, 0, 100, 90)
        p5.noFill()
        p5.ellipse(xPosition, yPosition, size + 2, size + 2)
      }

export default drawControlSlider
  