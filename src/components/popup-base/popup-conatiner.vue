<template>
  <div class="vc-popup-conatiner" ref="container"></div>
</template>

<script>
  export default {
    name: 'vc-popup-conatiner',

    methods: {
      addPopUp ($dom) {
        this.$refs.container.appendChild($dom)
      },

      removePopUp ($dom) {
        this.$refs.container.removeChild($dom)
      },

      turnOn () {
        this.$el.classList.add('on')
      },

      turnOff () {
        this.$el.classList.remove('on')
      }
    }
  }
</script>

<style lang="scss">
  .vc-popup-conatiner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;

    &.on{
      z-index: 0;
    }
  }
</style>
<style>
  body > *:first-child{
    position: relative;
    z-index: 0;
  }
</style>
