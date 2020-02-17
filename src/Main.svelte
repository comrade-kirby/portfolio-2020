<script>
  import { fade } from 'svelte/transition'

  import { open } from './stores.js'
  import Home from './Home.svelte'
  import About from './About.svelte'
  import Contact from './Contact.svelte'
  import SidePanel from './SidePanel.svelte'

  import { 
    screenHeight,
    scrollPosition,
    closeHover,
    currentView,
    sizeProgress,
    pullProgress,
    thinProgress,
    autoProgress,
    closedOnce
  } from './stores.js'

  const handleClose = () => {
    open.set(false)
    if (!$closedOnce) {
      sizeProgress.set(1, { delay: 400 })
      pullProgress.set(1, { delay: 300 })
      thinProgress.set(1, { delay: 200 })
      autoProgress.set(1, { delay: 100 })
    }

    closedOnce.set(true)
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
    min-width: 750px;
    min-height: 500px;
    width: 50%;
    height: 50%;
  }

  .close-button {
    position: absolute;
    right: 30px;
    top: 30px;
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
    font-size: 24px;
    text-shadow: 0px 0px 5px hsl(0, 0%, 0%, 15%);
  }

  .active {
    font-weight: 600;
    text-decoration: underline wavy 2px;
  }
</style>

<div class='main'>
  <div class='side-panel'>
    <SidePanel />
  </div>
  {#if $open}
  <div class='content'>
    <button 
      class='close-button'
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
  <div class='buttons'>
    <button class='nav-button' class:active={$currentView == 'home'} on:click={() => $currentView = 'home'}>home</button>
    <button class='nav-button' class:active={$currentView == 'about'} on:click={() => $currentView = 'about'}>about</button>
    <button class='nav-button' class:active={$currentView == 'contact'} on:click={() => $currentView = 'contact'}>contact</button>
  </div>
  {/if}
</div>