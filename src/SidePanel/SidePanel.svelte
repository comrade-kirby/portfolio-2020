<script>
  import { fade } from 'svelte/transition'
  import BackgroundControls from './BackgroundControls/BackgroundControls.svelte'
  import HomeButton from './HomeButton/HomeButton.svelte'
  import InfoButton from './InfoButton/InfoButton.svelte'
  import { smallDimensions } from '../stores.js'
</script>

<style>
  .side-panel {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 60px;
    height: 100%;
    z-index: 1;
  }
  
  .controls-container {
    height: 100%;
    overflow: scroll;
  }
</style>

<div class='side-panel' transition:fade>
  <HomeButton />
  <InfoButton />
  <div class='controls-container'>
    <BackgroundControls />
  </div>
</div>