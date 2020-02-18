<script>
  import { fade } from 'svelte/transition'

  import Home from './Home.svelte'
  import About from './About.svelte'
  import Contact from './Contact.svelte'
  import SidePanel from './SidePanel.svelte'
  import { openControlButtons } from './helpers'
  import { 
    screenHeight,
    closeHover,
    closedOnce,
    currentView,
    mobileLayout,
    open,
    smallDimensions,
    sizeProgress,
    pullProgress,
    thinProgress,
    autoProgress
  } from './stores.js'

  const controlButtons = [sizeProgress, pullProgress, thinProgress, autoProgress]
  const handleClose = () => {
    open.set(false)
    if (!$closedOnce) {
      openControlButtons(controlButtons)
      closedOnce.set(true)
    }
  }
</script>

<style>
  .main { 
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .side-panel {
    position: absolute;
    right: 0;
    height: 100%;
  }

  .content {
    position: relative;
    min-width: var(--minWidth);
    min-height: 500px;
    width: var(--screenPercentage);
    height: 50%;
  }

  .close-button {
    position: absolute;
    right: var(--position);
    top: var(--position);
    height: 40px;
    width: 40px;
    z-index: 1;
    opacity: 0;
  }

  .buttons {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
  }

  .nav-button {
    background: none;
    color: white;
    border: none;
    font-size: var(--size);
    text-shadow: 1px 1px 1px hsl(0, 0%, 0%, 40%);
    z-index: 1;
  }

  .active {
    font-weight: 600;
    text-decoration: underline wavy 2px;
  }
</style>

<div class='main'>
  {#if !$mobileLayout || !$open}
    <div class='side-panel'>
      <SidePanel />
    </div>
  {/if}
  {#if $open}
  <div class='content' style='--minWidth:{$smallDimensions ? 350 : 700}px; --screenPercentage:{$smallDimensions ? 75 : 50}%'>
    <button 
      class='close-button'
      style='--position:{$smallDimensions ? 10 : 30}px'
      on:click={handleClose} 
      on:mouseover={() => { $closeHover = true }}
      on:mouseout={() => { $closeHover = false }} />
    {#if $currentView == 'home'}
      <Home />
    {:else if $currentView == 'about'}
      <About />
    {:else }
      <Contact />
    {/if}
  </div>
  <div class='buttons' style='--size:{ $smallDimensions ? 18 : 24 }px'>
    <button class='nav-button' class:active={$currentView == 'home'} on:click={() => $currentView = 'home'}>home</button>
    <button class='nav-button' class:active={$currentView == 'about'} on:click={() => $currentView = 'about'}>about</button>
    <button class='nav-button' class:active={$currentView == 'contact'} on:click={() => $currentView = 'contact'}>contact</button>
  </div>
  {/if}
</div>