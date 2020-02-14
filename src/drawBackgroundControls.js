import { drawContainer, transparentText, getOpacity, transparentObject, transparentShape } from './helpers'

const controlsXOffset = 540
const centerX = controlsXOffset + 30

const drawBackgroundControls = (p5, height, maximizeHover, infoParams,buttonParams) => {
  drawContainer(p5, 60, height, controlsXOffset)
  drawMaximizeTab(p5, maximizeHover)
  drawInfoButton(p5, infoParams)

  buttonParams.forEach(button => {
    drawControlButton(p5, button)
  })
}

  const drawMaximizeTab = (p5, hover) => {
    const dividerY = 80
    drawMaximizeIcon(p5, hover)
    drawLabel(p5, 'home', 60, hover)
    drawDivider(p5, dividerY, hover)
  }

    const drawMaximizeIcon = (p5, hover) => {
      const opacity = getOpacity(hover)

      const xPosition = controlsXOffset + 20
      const yPosition = 20
      // use transparentObject here
      p5.strokeWeight(2)
      p5.strokeCap(p5.PROJECT)

      const maximizeIcon = () => {
        p5.rect(xPosition, yPosition, 20, 20)
        p5.rect(xPosition + 5, yPosition + 5, 10, 10)
        p5.line(xPosition + 7, yPosition + 7, xPosition + 13, yPosition + 7)
      }
      const options = { stroke: true, opacity }
      transparentShape(p5, maximizeIcon, options)
    }

  const drawInfoButton = (p5, infoParams) => {
    const hover = infoParams.hover
    const progress = infoParams.progress
    const topY = 80
    const textBoxY = topY + 1
    const iconY = topY + 180
    const labelY = topY + 210
    const dividerY = topY + 230

    drawControlTitle(p5, hover)
    drawTextBox(p5, textBoxY, progress)
    if (progress && hover) {
      drawXIcon(p5, iconY, progress)
    } else {
      drawInfoIcon(p5, iconY, hover)
    }
    drawLabel(p5, 'info', labelY, hover)
    drawDivider(p5, dividerY, hover)
  }

  const drawControlTitle = (p5, hover) => {
    const verticalText = [...'canvas'].map(letter => letter + '\n').join('')
    transparentText(p5, {
      text: verticalText,
      textSize: 24,
      textLeading: 22,
      horizontalAlignment: p5.CENTER,
      xPosition: controlsXOffset + 30,
      yPosition: 115,
      hover: hover
    })
  }

  const drawTextBox = (p5, yPosition, progress) => {
    const maxWidth = controlsXOffset
    const maxRadius = 25

    const currentWidth = progress * maxWidth
    const currentRadius = progress * maxRadius
    const xPosition = maxWidth - currentWidth
    const height = 228
    
    eraseArea(p5, yPosition, maxWidth, height)
    
    p5.noStroke()
    p5.fill(0, 0, 100)
    p5.rect(xPosition, yPosition, currentWidth, height, currentRadius, 0, 0, currentRadius)
  }

  const drawControlButton = (p5, params) => {
    const { text, value, yPosition, progress, hover } = params
    
    
    drawLabel(p5, text, yPosition + 30, hover)
    
    if (hover && progress) {
      drawXIcon(p5, yPosition, progress)
    } else { // value
      transparentText(p5, {
        text: (value * 100).toFixed(0),
        textSize: 16,
        horizontalAlignment: p5.CENTER,
        xPosition: centerX,
        yPosition: yPosition + 5,
        animate: true,
        progress: progress
      })
    }

    drawSlider(p5, yPosition, progress)
    drawIcon(p5, params)    
  }

    const drawSlider = (p5, yPosition, progress) => {
      const maxWidth = 240
      const currentWidth = progress * maxWidth
      const backgroundX = controlsXOffset - currentWidth
      const backgroundY = yPosition - 25
      const backgroundHeight = 50
      const lineX = backgroundX + 20
      const lineY = yPosition

      eraseArea(p5, backgroundY, maxWidth, backgroundHeight)
      drawSliderBackground(p5, backgroundX, backgroundY, currentWidth, backgroundHeight, progress)
      drawSliderLine(p5, lineX, lineY, progress) 
    }

      const drawSliderBackground = (p5, xPosition, yPosition, width, height, progress) => {
        const maxRadius = 25
        const currentRadius = progress * maxRadius

        p5.fill(0, 0, 100)
        p5.rect(xPosition, yPosition, width, height, currentRadius, 0, 0, currentRadius)
      }

      const drawSliderLine = (p5, xPosition, yPosition, progress) => {
        const maxOpacity = getOpacity()
        const currentOpacity = progress * maxOpacity 

        p5.strokeWeight(2)
        const line = () => {
          p5.line(xPosition, yPosition, controlsXOffset - 10, yPosition)
        }
  
        const lineOptions = { stroke: true, progress, opacity: currentOpacity }
        transparentShape(p5, line, lineOptions)
      }

    const drawIcon = (p5, params) => {
      const { text, value, yPosition, progress, hover } = params
    
      const sliderLength = 210
      const sliderPosition = sliderLength - (value * sliderLength)
      const sliderIconPosition = (centerX) - progress * (40 + sliderPosition)
      const xPosition = sliderIconPosition
    
      switch (text) {
        case 'size':
          drawSizeIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'pull':
          drawPullIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'opacity':
          drawOpacityIcon(p5, xPosition, yPosition, value, hover)
          break
        case 'random':
          drawRandomIcon(p5, xPosition, yPosition, value, hover)
          break
      }
    }
      
      const drawInfoIcon = (p5, yPosition, hover) => {
        const opacity = getOpacity(hover)
        const size = 25
        
        const circle = () => {
          p5.ellipse(centerX, yPosition, size, size)
        }

        const options = { fill: true, opacity}
        transparentShape(p5, circle, options)
        drawLowerCaseI(p5, yPosition)
      }

        const drawLowerCaseI = (p5, yPosition) => {
          p5.strokeWeight(3)
          p5.strokeCap(p5.PROJECT)
          p5.stroke(0, 0, 100)
          p5.line(centerX, yPosition, centerX, yPosition + 6)
          p5.line(centerX, yPosition - 5, centerX, yPosition - 5)
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

      const drawOpacityIcon = (p5, xPosition, yPosition, value, hover) => {
        const maxOpacity = 100
        const opacity = value * maxOpacity
        drawCircle(p5, xPosition, yPosition, 20, hover, opacity)
      }

      const drawRandomIcon = (p5, xPosition, yPosition, value, hover) => {
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

          p5.fill(0, 0, 100)
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
        p5.stroke(0, 0, 100)
        p5.noFill()
        p5.ellipse(xPosition, yPosition, size + 2, size + 2)
      }

  const drawLabel = (p5, text, y, hover) => {
    transparentText(p5, {
      text: text,
      textSize: 16,
      horizontalAlignment: p5.CENTER,
      xPosition: centerX,
      yPosition: y,
      hover
    })
  }

  const drawDivider = (p5, yPosition, hover) => {
    const opacity = getOpacity(hover)

    p5.strokeWeight(2)
    const divider = () => {
      p5.line(controlsXOffset, yPosition, controlsXOffset + 60, yPosition)
    }
    const options = { stroke: true, opacity }
    transparentShape(p5, divider, options)
  }

  const drawXIcon = (p5, yPosition, progress) => {
    const opacity = getOpacity(true)

    p5.strokeWeight(2)
    const xIcon = () => {
      p5.line(centerX - 10, yPosition - 10, centerX + 10, yPosition + 10)
      p5.line(centerX - 10, yPosition + 10, centerX + 10, yPosition - 10)
    }

    const options = { stroke: true, opacity }
    transparentShape(p5, xIcon, options)
  }
  
  const eraseArea = (p5, yPosition, width, height) => {
    const xPosition = controlsXOffset - width
    const sliderArea = () => {
      p5.rect(xPosition, yPosition, width, height)
    } 
    const sliderOptions = { fill: true, opacity: 0 }
    transparentShape(p5, sliderArea, sliderOptions)
  }
export default drawBackgroundControls