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
        case 'speed':
          drawSpeedIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'opac':
          drawOpacityIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'freq':
          drawFrequencyIcon(p5, xPosition, yPosition, value, hover)
          break
      }
    }
      
      
      const drawSizeIcon = (p5, xPosition, yPosition, value, hover) => {
        const maxSize = 25
        const minSize = 5
        const size = value * maxSize + minSize
        drawCircle(p5, xPosition, yPosition, size, hover)
      }
  
      const drawSpeedIcon = (p5, x, y, value, hover) => {
        const maxDistance = 10
        const minDistance = 2
        const offset = value * maxDistance + minDistance
        const circleSize = 20

        drawCircle(p5, x + offset, y, circleSize, hover)
        drawCircle(p5, x, y, circleSize, hover)
        drawCircle(p5, x - offset, y, circleSize, hover) 
      }

      const drawOpacityIcon = (p5, xPosition, yPosition, value, hover) => {
        const circleSize = 25
        const maxOpacity = 100
        const opacity = 100 - (value * maxOpacity)
        drawCircle(p5, xPosition, yPosition, circleSize, hover, opacity)
      }

      const drawFrequencyIcon = (p5, xPosition, yPosition, value, hover) => {
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
  