<script>
  import { fade } from 'svelte/transition'
</script>

<style>
  .knockout-box {
    width: 50%;
    height: 50%;
    min-width: 300px;
  }

  svg #overlay {
    fill: white;
    opacity: .9;
  }
  svg #text {
    font-size: 40px;
  }

  svg #mask-container {
    fill: white;
    mask: url(#box-mask);
  }
  svg #text-darken {
    fill: black;
    opacity: .1;
  }
</style>

<svg transition:fade class='knockout-box'>
  <defs>
    <mask id='box-mask' x='0' y='0' width='100%' height='100%'>
      <rect id='overlay' x='0' y='0' width='100%' height='100%' />
      <text id='text' text-anchor='end' x='100%' y='100%' dx='-20' dy='-100' >max</text>
      <text id='text' text-anchor='end' x='100%' y='100%' dx='-20' dy='-60' >houston</text>
      <text id='text' text-anchor='end' x='100%' y='100%' dx='-20' dy='-20'>oppenheimer</text>
      <text id='text' dx='20' dy='50'>creative</text>
      <text id='text' dx='20' dy='90'>web</text>
      <!-- <svg viewBox='0 0 36 36' height='36' width='100%' preserveAspectRatio='xMaxYMin meet'>
        <path d='M6 19h12v2H6z' />
        <path fill='none' d='M0 0h24v24H0V0z'/>
      </svg> -->
    </mask>
  </defs>
  <rect id='text-darken' x='0' y='0' width='100%' height='100%' />
  <rect id='mask-container' x='0' y='0' width='100%' height='100%' />
</svg>