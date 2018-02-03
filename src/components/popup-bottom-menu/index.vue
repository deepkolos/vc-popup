<template>
  <ul class="vc-popup-bottom-menu">
    <li class="vc-popup-bottom-menu-li" 
      v-for="(item, key) in items" 
      @click="item.click" 
      :key="key"
    >{{item.name}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'vc-popup-bottom-menu',

    props: {
      e: {
        default: null
      },
      items: {
        type: Array,
        required: true
      },
      onClose: Function,
      onOpen: Function
    },

    created () {
      this.event = {
        inAnimation: () => {
          var $el = this.$el

          $el.classList.add('inital')
          requestAnimationFrame(function () {
            $el.classList.remove('inital')
            $el.classList.add('inAnimation')
          })
        },
        outAnimation: () => {
          var $el = this.$el

          $el.classList.remove('inAnimation')
          requestAnimationFrame(function () {
            $el.classList.add('outAnimation')
          })
        },
        beforeEnter: () => {},
        afterEnter: () => {},
        beforeLeave: () => {},
        afterLeave: () => {}
      }
    }
  }
</script>

<style lang="scss">
  .vc-popup-bottom-menu {
    will-change: opacity, transform;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: auto;
    transition: all 250ms ease 0s;
    padding: 0;
    margin: 0;

    &.inital {
      opacity: 0;
      transform: translateY(100%) translateZ(0);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0%) translateZ(0);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(100%) translateZ(0);
      transition-duration: 400ms;
    }
  }

  .vc-popup-bottom-menu-li {
    background: white;
    padding: 0 21px;
    font-size: 16px;
    width: calc(100vw - 21px*2);
    color: #5e5e5e;
    min-height: 42px;
    display: flex;
    align-items: center;
    margin: 0;
  }
</style>
