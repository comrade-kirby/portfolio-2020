<script>
  import { fade } from 'svelte/transition'
  import { writable } from 'svelte/store'

  import Home from './Home.svelte'
  import About from './About.svelte'

  import { screenHeight, scrollPosition } from './stores.js'

  let display = 'about'
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
  {#if display == 'home'}
  <Home />
  {:else if display == 'about'}
  <About />
  {/if}
  <div class='buttons'>
    <button on:click={() => display = 'home'}>HOME</button>
    <button on:click={() => display = 'about'}>ABOUT</button>
    <button on:click={() => display = 'contact'}>CONTACT</button>
  </div>
</div>