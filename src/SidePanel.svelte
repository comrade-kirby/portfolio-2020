<script>
  import { fade } from 'svelte/transition'
  import BackgroundControls from './BackgroundControls.svelte'
  import HomeButton from './HomeButton.svelte'
  import InfoButton from './InfoButton.svelte'
  import { open } from './stores'
</script>

<style>
  .side-panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
  }

  .home-button-container {
    position: relative;
    width: 60px;
    height: 70px;
  }

  .info-button-container {
    position: relative;
    width: 480px;
    height: 220px;
  }

  .controls-container {
    flex: 1;
    overflow: scroll;
    width: 300px;
  }
</style>

{#if !$open}
  <div class='side-panel' transition:fade>
    <div class='home-button-container'>
      <HomeButton />
    </div>
    <div class='info-button-container'>
      <InfoButton />
    </div>
    <div class='controls-container'>
      <BackgroundControls />
    </div>
  </div>
{/if}