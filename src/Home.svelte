<script>
</script>
<style>
  div { 
    height: 50%;
    width: 50%;
    position: absolute;
  }
  svg {
    width: 100%;
    height: 100%;
  }

  svg #overlay {
    fill: white;
    opacity: .9;
  }
  svg #text {
    font-size: 40px;
  }

  svg #mask-container {
    fill: white;
    mask: url(#mask);
  }
  svg #text-darken {
    fill: black;
    opacity: .1;
  }
</style>
<div>
  <svg>
    <defs>
      <mask id="mask" x="0" y="0" width="100%" height="100%">
        <rect id="overlay" x="0" y="0" width="100%" height="100%" />
        <text id="text" text-anchor="end" x="100%" y="100%" dx="-20" dy="-100" >max</text>
        <text id="text" text-anchor="end" x="100%" y="100%" dx="-20" dy="-60" >houston</text>
        <text id="text" text-anchor="end" x="100%" y="100%" dx="-20" dy="-20">oppenheimer</text>
        <text id="text" dx="20" dy="50">creative</text>
        <text id="text" dx="20" dy="90">web</text>
      </mask>
    </defs>
    <rect id="text-darken" x="0" y="0" width="100%" height="100%" />
    <rect id="mask-container" x="0" y="0" width="100%" height="100%" />
  </svg>
</div>