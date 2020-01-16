import { writable } from 'svelte/store'

export const screenHeight = writable(null)
export const screenWidth = writable(null)
export const longestScreenDimension = writable(null)