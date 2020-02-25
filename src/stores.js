import { writable } from 'svelte/store'
import { spring, tweened } from 'svelte/motion'
import { cubicIn, cubicOut } from 'svelte/easing'

import { logStiffness, logDamping } from './helpers.js'

export const screenHeight = writable(0)
export const screenWidth = writable(0)
export const longestScreenDimension = writable(0)
export const open = writable(true)
export const closeHover = writable(false)
export const currentView = writable('home')
export const closedOnce = writable(false)
export const mobileLayout = writable(true)
export const screenSize = writable('small')
export const reset = writable(false)
export const touch = writable(false)
export const active = writable(true)

export const circleHue = tweened(90, {
  duration: 3000,
  easing: cubicOut
})

export const backgroundHue = tweened(270, {
  duration: 5000,
  easing: cubicOut
})

const configs = [
  [0.9, 0.1, 0.93, 0.5],
  // [0.12, 0.78, 0.45, 0.60],
  // [0.19, 0.66, 0.23, 0.65],
  // [0.37, 0.27, 0.93, 0.96],
  // [0.62, 0.31, 0.33, 0.39],
  // [0.92, 0.03, 0.88, 0.71],
  // [0.05, 0.57, 0.27, 0.05], // cute
  // [0.65, 0.64, 0.87, 0.72],
  // [0.34, 0.34, 0.98, 0.26],
  // [0.29, 0.30, 0.61, 0.50],
  // [0.06, 0.75, 0.12, 0.50],
  // [0.03, 0.72, 0.21, 0.98],
  // [0.40, 0.27, 0.70, 0.8],
  // [0.15, 0.20, 0.30, 0.80]
]

const autoConfig = configs[Math.floor(Math.random() * configs.length)]
// const autoConfig = [Math.random(), Math.random(), Math.random(), Math.random()]

export const sizeValue = writable(autoConfig[0])
const startSpeedValue = autoConfig[1]
export const speedValue = writable(startSpeedValue)
export const opacityValue = writable(autoConfig[2])
export const frequencyValue = writable(autoConfig[3])

export const infoProgress = tweened(0, { easing: cubicIn })
export const sizeProgress = tweened(0, { easing: cubicIn })
export const speedProgress = tweened(0, { easing: cubicIn })
export const opacityProgress = tweened(0, { easing: cubicIn })
export const frequencyProgress = tweened(0, { easing: cubicIn })

export const  circleLocation = spring({ x: 0, y: 0 }, {
  stiffness: logStiffness(startSpeedValue),
  damping: logDamping(startSpeedValue)
})
