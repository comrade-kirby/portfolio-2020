import { writable } from 'svelte/store'
import { spring, tweened } from 'svelte/motion'
import { cubicIn, cubicOut } from 'svelte/easing'

import { logStiffness, logDamping } from './helpers.js'

export const screenHeight = writable(0)
export const screenWidth = writable(0)
export const longestScreenDimension = writable(0)
export const scrollPosition = writable(0)
export const open = writable(true)
export const closeHover = writable(false)
export const currentView = writable('home')
export const closedOnce = writable(false)


export const circleHue = tweened(90, {
  duration: 3000,
  easing: cubicOut
})

export const backgroundHue = tweened(270, {
  duration: 3000,
  easing: cubicOut
})

// animation controlls
const startPullValue = 0.1

export const sizeValue = writable(.9)
export const pullValue = writable(startPullValue)
export const opacityValue = writable(.93)
export const randomValue = writable(.5)
export const sizeProgress = tweened(0, { easing: cubicIn })
export const pullProgress = tweened(0, { easing: cubicIn })
export const opacityProgress = tweened(0, { easing: cubicIn })
export const randomProgress = tweened(0, { easing: cubicIn })
export const  circleLocation = spring({ x: 0, y: 0 }, {
  stiffness: logStiffness(startPullValue),
  damping: logDamping(startPullValue)
})
