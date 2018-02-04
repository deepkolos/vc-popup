<template>
  <ul class="vc-popup-by-animation">
    <li class="vc-popup-by-animation-li" v-for="(item, key) in items" @click="item.click" :key="key">{{item.name}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'vc-popup-by-animation',

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
      this.popupEvt = {
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
  .vc-popup-by-animation {
    will-change: opacity, transform;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
    transition: all 350ms ease 0s;
    display: inline-block;
    padding: 0;
    margin: 0;

    &.inital {
      opacity: 0;
    }

    &.inAnimation {
      animation: animation 280ms ease forwards;
    }

    &.outAnimation {
      animation: animation 280ms ease reverse;
    }
  }

  @keyframes animation {
    0%{
      opacity: 0;
      transform: scale(.7)
    }
    70%{
      transform: scale(1.05)
    }
    100%{
      opacity: 1;
      transform: scale(1)
    }
  }

  .vc-popup-by-animation-li {
    height: 43px;
    line-height: 43px;
    padding: 0 30px 0 15px;
    font-size: 14px;
    display: block;
    background: white;
    min-width: calc(90px - 45px);
    transition: all 200ms linear 0ms;
  }

  .vc-popup-by-animation-li:active {
    background: #E8E8E8;
    transition-duration: 85ms;
  }
</style>
