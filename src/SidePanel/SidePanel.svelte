<script>
  import { fade } from 'svelte/transition'
  import BackgroundControls from './BackgroundControls/BackgroundControls.svelte'
  import HomeButton from './HomeButton/HomeButton.svelte'
  import InfoButton from './InfoButton/InfoButton.svelte'
  import { screenSize } from '../stores'

  $: panelWidth = $screenSize == 'small' ? 45 : 60
</script>

<style>
  .side-panel {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: var(--width);
    height: 100%;
    z-index: 1;
  }
  
  .controls-container {
    height: 100%;
    pointer-events: none;
  }
</style>

<div 
  class='side-panel' 
  style='--width:{panelWidth}px;'
  transition:fade
>
  <HomeButton panelWidth={panelWidth} />
  <InfoButton panelWidth={panelWidth} />
  <div class='controls-container'>
    <BackgroundControls panelWidth={panelWidth} />
  </div>
</div>