<script>
  import { fade } from 'svelte/transition'
  import { writable } from 'svelte/store'

  import Home from './Home.svelte'
  import About from './About.svelte'
  import Contact from './Contact.svelte'

  import { screenHeight, scrollPosition } from './stores.js'

  let display = 'home'
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

  .content {
    position: relative;
    min-width: 375px;
    min-height: 300px;
    width: 50%;
    height: 50%;
  }

  .buttons {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
  }

  button {
    background: none;
    color: white;
    border: none;
    font-size: 24px;
    text-shadow: 0px 0px 5px hsl(0, 0%, 0%, 15%);
  }

  .active {
    font-weight: 600;
    text-decoration: underline wavy;
  }
</style>

<div class='main'>
  <div class='content'>
    {#if display == 'home'}
      <Home />
    {:else if display == 'about'}
      <About />
    {:else }
      <Contact />
    {/if}
  </div>
  <div class='buttons'>
    <button class:active={display == 'home'} on:click={() => display = 'home'}>HOME</button>
    <button class:active={display == 'about'} on:click={() => display = 'about'}>ABOUT</button>
    <button class:active={display == 'contact'} on:click={() => display = 'contact'}>CONTACT</button>
  </div>
</div>