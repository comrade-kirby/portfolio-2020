<script>
  import P5Canvas from '../../../P5Canvas.svelte'

  export let button
  let hover = false
  const handleClick = () => {
    if (button.progress == 0) {
      button.progressWritable.set(1)
    } else {
      button.progressWritable.set(0)
    }
  }
</script>

<style>
  button {
    margin: 0;
    right: 0;
    width: 60px;
    height: 70px;
    opacity: 0.5;
  }
</style>

<button 
  on:click={handleClick}
  on:mouseover={() => {hover = true}}
  on:mouseout={() => {hover = false}} 
/>