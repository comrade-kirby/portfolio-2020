<script>
  import { fade } from 'svelte/transition'

  import { open } from './stores.js'
  import BackgroundControls from './BackgroundControls.svelte'
  import Home from './Home.svelte'
  import About from './About.svelte'
  import Contact from './Contact.svelte'

  import { 
    screenHeight,
    scrollPosition,
    closeHover,
    currentView,
    sizeProgress,
    pullProgress,
    opacityProgress,
    randomProgress,
    closedOnce
  } from './stores.js'

  const handleClose = () => {
    open.set(false)
    
    if (!$closedOnce) {
      sizeProgress.set(1, { delay: 400 })
      pullProgress.set(1, { delay: 300 })
      opacityProgress.set(1, { delay: 200 })
      randomProgress.set(1, { delay: 100 })
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

  .background-controls {
    position: absolute;
    right: 0;
    width: 600px;
    height: 100%;
  }

  .content {
    position: relative;
    min-width: 375px;
    min-height: 300px;
    width: 50%;
    height: 50%;
  }

  .close-button {
    position: absolute;
    right: 20px;
    top: 18px;
    height: 25px;
    width: 25px;
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
  <div class='background-controls'>
    <BackgroundControls />
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
    <button class='nav-button' class:active={$currentView == 'home'} on:click={() => $currentView = 'home'}>HOME</button>
    <button class='nav-button' class:active={$currentView == 'about'} on:click={() => $currentView = 'about'}>ABOUT</button>
    <button class='nav-button' class:active={$currentView == 'contact'} on:click={() => $currentView = 'contact'}>CONTACT</button>
  </div>
  {/if}
</div>