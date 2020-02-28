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

export const circleHue = tweened(90, {
  duration: 3000,
  easing: cubicOut
})

export const backgroundHue = tweened(270, {
  duration: 5000,
  easing: cubicOut
})

const configs = [
  [0.9, 0.12, 0.05, 0.5]
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
