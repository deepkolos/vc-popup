<template>
  <ul class="vc-popup-over" ref="menu">
    <span class="vc-popup-over-triangle" ref="triangle"></span>
    <li class="vc-popup-over-li" v-for="(item, key) in items" @click="item.click" :key="key">
      <span class="li-icon-container">
        <img class="li-icon" :src="item.src" alt="">
      </span>
      <span class="li-title">
        {{item.name}}
      </span>
      </li>
  </ul>
</template>

<script>
  export default {
    name: 'vc-popup-over',

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
        afterDomLoad: () => {
          this._setTriangle()
        },
        beforeEnter: () => {},
        afterEnter: () => {},
        beforeLeave: () => {},
        afterLeave: () => {}
      }
    },

    methods: {
      _setTriangle () {
        var $triangle = this.$refs.triangle,
          $el = this.$el,
          config = this.$popupCtrl.config,
          controller = this.$popupCtrl,
          refCorner, relativeToCorner,
          rect = this.$el.getBoundingClientRect()

        refCorner =
          controller.parseRefCorner(config.refCorner)
        relativeToCorner =
          controller.parseRelativeToCorner(config.relativeToCorner)

        function ajustLeftRight () {
          if (refCorner[1] === 'left' && relativeToCorner[1] === 'after') {
            $triangle.style.left = '17px'
          } else if (refCorner[1] === 'right' && relativeToCorner[1] === 'before') {
            $triangle.style.right = '10px'
          } else if (refCorner[1] === 'center') {
            $triangle.style.left = rect.width / 2 + 'px'
          }
        }

        function ajustTopBottom () {
          if (refCorner[0] === 'top' && relativeToCorner[0] === 'below') {
            $triangle.style.top = '17px'
          } else if (refCorner[0] === 'bottom' && relativeToCorner[0] === 'above') {
            $triangle.style.bottom = '10px'
          } else if (refCorner[0] === 'center') {
            $triangle.style.top = rect.height / 2 + 'px'
          }
        }

        if (refCorner[0] === 'top' && relativeToCorner[0] === 'above') {
          ajustLeftRight()
          $triangle.style.bottom = '-7px'
          $el.style.marginTop = '-8px'
        } else if (refCorner[0] === 'bottom' && relativeToCorner[0] === 'below') {
          ajustLeftRight()
          $triangle.style.top = '0px'
          $el.style.marginTop = '8px'
        } else if (refCorner[1] === 'left' && relativeToCorner[1] === 'before') {
          ajustTopBottom()
          $triangle.style.right = '-7px'
          $el.style.marginLeft = '-8px'
        } else if (refCorner[1] === 'right' && relativeToCorner[1] === 'after') {
          ajustTopBottom()
          $triangle.style.left = '0px'
          $el.style.marginLeft = '8px'
        } else {
          $triangle.style.opacity = 0
        }
      }
    }
  }
</script>

<style lang="scss">
  .vc-popup-over {
    will-change: opacity, transform;
    border-radius: 3.5px;
    transition: all 250ms ease 0s;
    display: inline-block;
    padding: 0px 8px;
    background: white;
    margin: 0;

    &.inital {
      opacity: 0;
      transform: translateY(-10px);
    }

    &.inAnimation {
      opacity: 1;
      transform: translateY(0px);
    }

    &.outAnimation {
      opacity: 0;
      transform: translateY(  10px);
      transition-duration: 300ms;
    }
  }

  .vc-popup-over-triangle {
    position: absolute;
    width: 7px;
    height: 7px;
    background-color: white;
    transform: translate(-3.5px, -3.5px) rotate(45deg) ;
  }

  .vc-popup-over-li {
    display: block;
    padding: 9px 8px;
    font-size: 15px;
    line-height: 1.4;
    color: black;
    border-bottom: calc(2px/3) solid #EBEBEB;
    display: flex;
    margin: 0;
  }

  .vc-popup-over-li:last-child{
    border-bottom: none;
  }

  .vc-popup-over-li .li-icon-container{
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .vc-popup-over-li .li-icon{
    margin-right: 8px;
    width: 18px;
    height: 18px;
  }
</style>
