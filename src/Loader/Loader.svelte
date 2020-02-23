<script>
  import { tweened } from 'svelte/motion'
  import { longestScreenDimension } from '../stores.js'
  
  const loaderProgress = tweened(0, { duration: 5000 })
  loaderProgress.set(360)
    
  setInterval(() => {
		loaderProgress.set(0, { duration: 0 })
		loaderProgress.set(360)
	}, 5000)
</script>

<style>
  svg {
    height: var(--dimension);
    width: var(--dimension);
  }
</style>

<div>
  <svg viewBox="0 0 100 100" style="--dimension:{$longestScreenDimension}px">
    <defs>
      <mask id="circleMask">
        <rect height="100" width="100" fill="hsl(0,0%,10%)"/>
        <circle cx="50" cy="50" r="8" fill="white" />
        <path d="M46 55 L46 45 L50 52 L54 45 L54 55 L46 55" 		
          stroke-linecap="square" 
          stroke-width=".5" 
          stroke="black" 
          fill="none" />
        <path d="M45 44.5 L55 44.5" fill="none" stroke="white" />
        <path d="M48 52.5 L52 52.5" fill="none" stroke="white" />
      </mask>
      <radialGradient id="GradientReflect"
        cx="0.5" cy="0.5" r="0.4" fx="0.75" fy="0.75"
        spreadMethod="reflect">
        <stop offset="0%" stop-color="hsl({$loaderProgress + 0},100%,85%)"/>
        <stop offset="10%" stop-color="hsl({$loaderProgress + 36},100%,85%)"/>
        <stop offset="20%" stop-color="hsl({$loaderProgress + 72},100%,85%)"/>
        <stop offset="30%" stop-color="hsl({$loaderProgress + 108},100%,85%)"/>
        <stop offset="50%" stop-color="hsl({$loaderProgress + 144},100%,85%)"/>
        <stop offset="60%" stop-color="hsl({$loaderProgress + 180},100%,85%)"/>
        <stop offset="70%" stop-color="hsl({$loaderProgress + 216},100%,85%)"/>
        <stop offset="80%" stop-color="hsl({$loaderProgress + 252},100%,85%)"/>
        <stop offset="90%" stop-color="hsl({$loaderProgress + 288},100%,85%)"/>
        <stop offset="100%" stop-color="hsl({$loaderProgress + 324},100%,85%)"/>
      </radialGradient>
    </defs>
    <rect width='100' height='100' fill="url(#GradientReflect)" mask="url(#circleMask)"/>
  </svg>
</div>