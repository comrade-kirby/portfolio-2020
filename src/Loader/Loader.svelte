<script>
  import { tweened } from 'svelte/motion'
  import { cubicIn, backIn } from 'svelte/easing'
  import { fade } from 'svelte/transition'

  import { longestScreenDimension } from '../stores.js'
  
  export let loaded
  let animationComplete = false
  const loaderProgress = tweened(0, { duration: 5000 })
  const circleRadius = tweened(8)
  const maskTransparency = tweened(100)
  loaderProgress.set(360)
    
  const loadedAnimation = () => {
    loaderProgress.set($loaderProgress + 360, { duration: 2000, easing: cubicIn })
    circleRadius.set(0, { delay: 1500, duration: 500, easing: backIn })
    maskTransparency.set(0, { delay: 1300, duration: 500, easing: cubicIn })
    setTimeout(() => { animationComplete = true }, 2100)
  }

  setInterval(() => {
    if (!loaded) {
      loaderProgress.set(0, { duration: 0 })
		  loaderProgress.set(360)
    }
  }, 5000)
  
  $: if (loaded) { loadedAnimation() }
</script>

<style>
  div {
    position: absolute;
    z-index: 2;
    background-color: white;
  }
  svg {
    height: var(--dimension);
    width: var(--dimension);
  }
  stop {
    stop-color: hsl(calc(var(--progress) + var(--startHue)),100%,85%);
  }
</style>

{#if !animationComplete }
  <div transition:fade>
    <svg viewBox="0 0 100 100" style="--dimension:{$longestScreenDimension}px;">
      <defs>
        <mask id="circleMask">
          <rect height="100" width="100" fill="hsl(0,0%,10%)"/>
          <circle cx="50" cy="50" r="{$circleRadius}" fill="hsl(0,0%,100%,{$maskTransparency + 30}%" />
          <path d="M46 55 L46 45 L50 52 L54 45 L54 55 L46 55" 		
            stroke-linecap="square" 
            stroke-width=".5" 
            stroke="hsl(0,0%,0%,{$maskTransparency}%" 
            fill="none" />
          <path d="M45 44.5 L55 44.5" fill="none" stroke="hsl(0,0%,100%,{$maskTransparency}%" />
          <path d="M48 52.5 L52 52.5" fill="none" stroke="hsl(0,0%,100%,{$maskTransparency}%" />
        </mask>
        <radialGradient id="GradientReflect"
          cx="0.5" cy="0.5" r="0.4" fx="0.75" fy="0.75"
          style="--progress:{$loaderProgress};"
          spreadMethod="reflect">
          <stop offset="0%" style="--startHue:0"/>
          <stop offset="10%" style="--startHue:36"/>
          <stop offset="20%" style="--startHue:72"/>
          <stop offset="30%" style="--startHue:108"/>
          <stop offset="50%" style="--startHue:144"/>
          <stop offset="60%" style="--startHue:180"/>
          <stop offset="70%" style="--startHue:216"/>
          <stop offset="80%" style="--startHue:252"/>
          <stop offset="90%" style="--startHue:288"/>
          <stop offset="100%" style="--startHue:324"/>
        </radialGradient>
      </defs>
      <rect width='100' height='100' fill="url(#GradientReflect)" mask="url(#circleMask)"/>
    </svg>
  </div>
{/if}