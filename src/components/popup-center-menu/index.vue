<template>
  <vc-gesture-tile-press :unsetOnPressEnd="false" ref="tile">
    <ul class="vc-popup-center-menu" ref="menu" @touchend="_checkCloseTrigger">
      <li class="vc-popup-center-menu-li"
        v-for="(item, key) in items"
        @click="item.click"
        :key="key"
      >{{item.name}}</li>
    </ul>
  </vc-gesture-tile-press>
</template>

<script>
  import VcGestureTilePress from '../gesture-tile-press'

  export default {
    name: 'vc-popup-center-menu',

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

    components: {
      VcGestureTilePress
    },

    created () {
      this.popupEvt = {
        beforeEnter: () => {
          var $el = this.$refs.menu,
            vmTile = this.$refs.tile,
            $content = vmTile.$refs.content

          this.$popupCtrl.vmBase.setAnimateDom($content)

          $el.classList.add('inital')
          requestAnimationFrame(function () {
            $el.classList.remove('inital')
            $el.classList.add('inAnimation')
          })
        },
        afterEnter: () => {},
        beforeLeave: () => {
          var vmTile = this.$refs.tile,
            $content = vmTile.$refs.content,
            deg = vmTile.maxDeg * 1.15

          this.$popupCtrl.vmBase.setAnimateDom($content)
          vmTile.orientationY = vmTile.orientationY === undefined ? 1 : vmTile.orientationY
          vmTile.orientationX = vmTile.orientationX === undefined ? 0 : vmTile.orientationX

          requestAnimationFrame(function () {
            $content.style.transitionDuration = '280ms'
            $content.style.transform =
              `rotateX(${vmTile.orientationY * deg}deg) rotateY(${vmTile.orientationX * deg}deg) translateZ(-100px)`
            $content.style.opacity = 0
          })
        },
        afterLeave: () => {}
      }
    },

    methods: {
      _checkCloseTrigger () {
        setTimeout(() => {
          if (this.$popupCtrl.vmBase.isShowing)
            this.$refs.tile.unsetPressEffect()
        }, 30)
      }
    }
  }
</script>

<style lang="scss">
  .vc-popup-center-menu {
    will-change: opacity, transform;
    width: calc(100vw - 36px*2 - 4px*2);
    border-radius: 3.5px;
    overflow: hidden;
    transition: all 250ms ease 0s;
    padding: 0;
    margin: 0;

    &.inital {
      opacity: 0;
      transform: rotateX(15deg) translateZ(-80px);
    }

    &.inAnimation {
      opacity: 1;
      transform: rotateX(0deg) translateZ(0px);
    }

    &.outAnimation {
      opacity: 0;
      transform: rotateX(-25deg) translateZ(-80px);
      transition-duration: 300ms;
    }
  }

  .vc-popup-center-menu-li {
    display: block;
    background: white;
    padding: 13px 21px;
    font-size: 16px;
    line-height: 1.4;
    color: black;
    border-bottom: calc(2px/3) solid #EBEBEB;
    margin: 0;
  }

  .vc-popup-center-menu-li:last-child{
    border-bottom: none;
  }
</style>
