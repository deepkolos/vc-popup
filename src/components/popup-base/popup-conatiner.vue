<template>
  <div class="vc-popup-conatiner" ref="container">
    <svg display="none">
      <filter id="vc-effect-turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0 8.001" numOctaves="2" data-filterId="3" />
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="20" />
      </filter>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'vc-popup-conatiner',

    methods: {
      addPopup ($dom) {
        this.$refs.container.appendChild($dom)
      },

      removePopup ($dom) {
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

    // & .vc-popup-base:not(:last-child) .vc-popup-mask{
    //   opacity: 0!important;
    //   transition-delay: 300ms;
    // }
  }

  body > *:first-child{
    position: relative;
    z-index: 0;
  }
</style>
