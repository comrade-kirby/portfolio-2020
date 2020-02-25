<script>
  import { tweened } from 'svelte/motion'
  import { cubicIn, backIn } from 'svelte/easing'
  import { fade } from 'svelte/transition'

  import { longestScreenDimension } from '../stores.js'
  
  export let loaded
  let animationComplete = false
  const loaderProgress = tweened(0, { duration: 3000 })
  const circleRadius = tweened(8)
  const maskTransparency = tweened(100)
  loaderProgress.set(360)
    
  const loadedAnimation = () => {
    circleRadius.set(0, { delay: 400, duration: 500, easing: backIn })
    maskTransparency.set(0, { delay: 300, duration: 500, easing: cubicIn })
    setTimeout(() => { animationComplete = true }, 1100)
  }

  setInterval(() => {
    if (!loaded) {
      loaderProgress.set(0, { duration: 0 })
		  loaderProgress.set(360)
    }
  }, 3000)
  
  $: if (loaded) { loadedAnimation() }
</script>

<style>
  div {
    position: absolute;
    z-index: 2;
    background-color:hsl(0,0%,100%,var(--transparency));
  }
  svg {
    height: var(--dimension);
    width: var(--dimension);
  }

  circle {
    fill: hsl(0,0%,100%,calc(var(--transparency) + 30%));
  }

  path {
    stroke: hsl(0,0%,0%,var(--transparency));
    fill: none;
    stroke-linecap: square;
    stroke-width: .5 ;
    stroke-miterlimit: 2;
  }

  stop {
    stop-color: hsl(calc(var(--progress) + var(--startHue)),100%,85%,var(--transparency));
  }
</style>

{#if !animationComplete }
  <div transition:fade 
    style="
      --transparency:{$maskTransparency}%;
      --dimension:{$longestScreenDimension}px;
      --progress:{$loaderProgress};
    "
  >
    <svg viewBox="0 0 100 100" style="">
      <defs>
        <mask id="circleMask">
          <rect height="100" width="100" fill="hsl(0,0%,10%)"/>
          <circle cx="50" cy="50" r="{$circleRadius}" />
          <path d="M46 55 L46 45 L50 52 L54 45 L54 55 L46 55" />
        </mask>
        <radialGradient id="GradientReflect"
          cx="0.5" cy="0.5" r="0.4" fx="0.75" fy="0.75"
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