<script>
  import { fade } from 'svelte/transition'
  import { screenHeight } from './stores.js'
  let scroll
</script>
<style>
  div {
    height: 100px;
    width: 100%;
    /* background-color: red; */
    position: fixed;
    top: 0;
    z-index: 10;
  }
  .knockout-header {
    width: 100%;
    height: 100%;
  }
  svg #overlay {
    fill: white;
    opacity: .9;
  }
  svg #text {
    font-size: 20px;
  }

  svg #mask-container {
    fill: white;
    mask: url(#header-mask);
  }
  svg #text-darken {
    fill: black;
    opacity: .1;
  }
</style>

<svelte:window bind:scrollY={scroll}/>
{#if scroll / $screenHeight >= 0.25 }
<div transition:fade>
  <svg class="knockout-header">
    <defs>
      <mask id="header-mask" x="0" y="0" width="100%" height="100%">
        <rect id="overlay" x="0" y="0" width="100%" height="100%" />
        <text id="text" text-anchor="end" x="100%" y="100%" dx="-25" dy="-65" >max</text>
        <text id="text" text-anchor="end" x="100%" y="100%" dx="-25" dy="-40" >houston</text>
        <text id="text" text-anchor="end" x="100%" y="100%" dx="-25" dy="-15">oppenheimer</text>
        <text id="text" dx="15" dy="25">creative</text>
        <text id="text" dx="15" dy="50">web</text>
      </mask>
    </defs>
    <rect id="text-darken" x="0" y="0" width="100%" height="100%" />
    <rect id="mask-container" x="0" y="0" width="100%" height="100%" />
  </svg>
</div>
{/if}