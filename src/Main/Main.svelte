<script>
  import Home from './Home/Home.svelte'
  import About from './About/About.svelte'
  import Contact from './Contact/Contact.svelte'
  import { openControlButtons } from '../helpers'
  import { 
    screenHeight,
    closeHover,
    closedOnce,
    currentView,
    mobileLayout,
    open,
    screenSize,
    sizeProgress,
    speedProgress,
    opacityProgress,
    frequencyProgress
  } from '../stores.js'

  const controlButtons = [sizeProgress, speedProgress, opacityProgress, frequencyProgress]
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .content {
    position: relative;
    min-width: var(--minWidth);
    min-height: 500px;
    width: var(--screenPercentage);
    height: 50%;
    pointer-events: all;
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
    pointer-events: all;

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
  <div class='content' style='--minWidth:{$screenSize == 'large' ? 700 : 350}px;  --screenPercentage:{$screenSize == 'large' ? 50 : 75}%'>
    <button 
      class='close-button'
      style='--position:{$screenSize == 'large' ? 30 : 10}px'
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
  <div class='buttons' style='--size:{ $screenSize == 'large' ? 24 : 18 }px'>
    <button class='nav-button' class:active={$currentView == 'home'} on:click={() => $currentView = 'home'}>home</button>
    <button class='nav-button' class:active={$currentView == 'about'} on:click={() => $currentView = 'about'}>about</button>
    <button class='nav-button' class:active={$currentView == 'contact'} on:click={() => $currentView = 'contact'}>contact</button>
  </div>
</div>