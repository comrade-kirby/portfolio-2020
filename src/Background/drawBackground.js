const drawBackground = (p5, opacity, backgroundHue, circleHue, sizeValue, circleLocation, longestScreenDimension) => {
  const coordinates = generateCoordinates(p5, sizeValue, circleLocation, longestScreenDimension)
  drawShape(p5, coordinates, opacity, backgroundHue, circleHue)
}

const generateCoordinates = (p5, sizeValue, circleLocation, longestScreenDimension) => {
  const circleSize = sizeValue * (longestScreenDimension * 1.1)
  const centerX = circleLocation.x
  const centerY = circleLocation.y

  const pointsCount = 5
  const sectionAngle = Math.PI*2 / pointsCount
  const radius = circleSize / 2
  let coordinates = []
  for (let i = 1; i <= pointsCount; i++) {
    var angle = i * sectionAngle
    
    const xOffset = Math.cos(angle) * radius
    const yOffset = Math.sin(angle) * radius
    const distanceToCenter = (Math.sqrt(
      ((p5.mouseX - centerX) ** 2) + ((p5.mouseY - centerY) ** 2)
    ))
    
    let x = centerX + xOffset
    let y = centerY + yOffset

    const distanceToVertex = (Math.sqrt(
      ((p5.mouseX - x) ** 2) + ((p5.mouseY - y) ** 2)
    ))
    
    const maxPush = longestScreenDimension / 4
    const push = maxPush - distanceToVertex

    if (push > 0 ) {
      let pushPercentage = (push / maxPush)

      if (distanceToCenter > radius) {
        x = centerX + (xOffset * (1 - pushPercentage))
        y = centerY + (yOffset * (1 - pushPercentage))
      } else {
        x = centerX + xOffset - (xOffset * pushPercentage)
        y = centerY + yOffset - (yOffset * pushPercentage)
      }
    }

    coordinates.push([x,  y])
  }

  return coordinates
}

const drawShape = (p5, coordinates, opacity, backgroundHue, circleHue) => {
  const saturation = 50
  const strokeLightness = 90
  const strokeAlpha = 90
  const fillLightness = 50
  const fillAlpha = opacity * 100

  p5.stroke(backgroundHue, saturation, strokeLightness, strokeAlpha);
  p5.strokeWeight(1)
  p5.fill(circleHue, saturation, fillLightness, fillAlpha)
  
  p5.beginShape();
  coordinates.forEach(coordinate => {
    p5.curveVertex(coordinate[0], coordinate[1])
  })
  p5.curveVertex(coordinates[0][0], coordinates[0][1])
  p5.curveVertex(coordinates[1][0], coordinates[1][1])
  p5.curveVertex(coordinates[2][0], coordinates[2][1])
  p5.endShape()
}

export default drawBackground