<template>
  <div style="position: relative;">
  <div class="morph-shape" ref="morph"
    data-morph-open="M0,0h80c0,0,0,9.977,0,29.834c0,19.945,0,30.249,0,30.249H0c0,0,0-10.055,0-30.332C0,8.219,0,0,0,0z"
    data-morph-close="M0,29.75h80c0,0-3.083,0.014-3.083,0.041c0,0.028,3.083,0.042,3.083,0.042H0c0,0,3.084-0.014,3.084-0.042
	C3.084,29.762,0,29.75,0,29.75z">
      <svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none">
        <path 
          ref="path"
          d="M0,29.75h80c0,0-3.083,0.014-3.083,0.041c0,0.028,3.083,0.042,3.083,0.042H0c0,0,3.084-0.014,3.084-0.042
	C3.084,29.762,0,29.75,0,29.75z"></path>
      </svg>
  </div>

  <div ref="slot"></div>
  </div>
</template>

<script>
export default {
  name: "effect-fold-zoom-svg",

  methods: {
    setPathColor (color) {
      this.$refs.path.setAttribute('fill', color)
    }
  }
};
</script>

<style>
.morph-shape {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -1;
}

.morph-shape svg {
	fill: #fff;
}
</style>
