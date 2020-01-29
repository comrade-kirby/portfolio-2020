<script>
  import { fade } from 'svelte/transition'
  import { writable } from 'svelte/store'

  import Home from './Home.svelte'
  import About from './About.svelte'
  import Contact from './Contact.svelte'

  import { screenHeight, scrollPosition } from './stores.js'

  let display = 'contact'
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
    height: 50%;
    width: 50%;
    min-width: 375px;
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
    <button on:click={() => display = 'home'}>HOME</button>
    <button on:click={() => display = 'about'}>ABOUT</button>
    <button on:click={() => display = 'contact'}>CONTACT</button>
  </div>
</div>