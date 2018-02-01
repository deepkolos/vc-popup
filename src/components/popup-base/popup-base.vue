<template>
  <div class="vc-popup-base"
    :routerId="routerId"
    ref="base"
    :style="{ position: positionType }"
    @touchmove="_maskPreventScroll"
    @mousewheel="_maskPreventScroll"
    @DOMMouseScroll="_maskPreventScroll"
  >
    <div class="vc-popup-mask" ref="mask" @click="_turnOffMask" ></div>
    <div class="vc-popup-slot" ref="slotContainer">
      <div ref="slot" @touchmove="_stopPropagation"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vc-popup-base',

    props: {
      e: {
        default: null
      },
      routerId: {
        type: String,
        required: true
      },
      maskDisable: {
        type: Boolean,
        default: false
      },
      runtimeConfig: Object
    },

    data () {
      return {
        positionType: null
      }
    },

    created () {
      this.isShowing = null
      this.afterEnterLocker = false
      this.afterLeaveLocker = false
      this.$animateDom = null
    },

    methods: {
      // 以下是提供给外部使用的
      setMaskOpacity (val) {
        this.$refs.mask.style.opacity = val
      },

      addMaskClass (name) {
        this.$refs.mask.classList.add(name)
      },

      removeMaskClass (name) {
        this.$refs.mask.classList.remove(name)
      },

      trunOffMaskTransition () {
        this.$refs.mask.style.transitionDuration = '0ms'
      },

      trunOnMaskTransition () {
        this.$refs.mask.style.transitionDuration = ''
      },

      setAnimateDom ($dom) {
        this.$animateDom = $dom
      },

      getAnimateDom ($dom) {
        return this.$animateDom || this.$refs.slot
      },

      //内部使用的
      _afterDomLoad () {
        this.vmSlot.event &&
        this.vmSlot.event.afterDomLoad &&
          this.vmSlot.event.afterDomLoad()
      },

      _enter () {
        this._beforeEnter()
        this.isShowing = true
      },

      _leave (callback) {
        this._afterLeaveCallback = callback
        this._beforeLeave()
        this.isShowing = false
      },

      _turnOffMask () {
        !this.maskDisable &&
          this.vmSlot.$popupCtrl.close()
      },

      _maskPreventScroll (e) {
        this.isShowing === true &&
        this.runtimeConfig.positionType !== 'absolute' &&
          e.preventDefault()
      },

      _addAnimationEndListener (callback, lock) {
        var $dom = this.$animateDom || this.$refs.slot

        this[lock] = false

        var onAnimationEnd = (e) => {
          if (e.target === $dom) {
            if (this[lock]) return
            this[lock] = true

            $dom.removeEventListener(
              'transitionend', onAnimationEnd)
            $dom.removeEventListener(
              'animationend', onAnimationEnd)

            callback instanceof Function && callback()
          }
        }

        $dom.addEventListener('transitionend', onAnimationEnd)
        $dom.addEventListener('animationend',  onAnimationEnd)
      },

      _beforeEnter () {
        requestAnimationFrame(() => {
          this.$refs.slot.style.transitionDuration = '0ms'
          this.setMaskOpacity(0)
          this._animation('in')

          this.vmSlot.event &&
          this.vmSlot.event.beforeEnter instanceof Function &&
            this.vmSlot.event.beforeEnter()

          this._addAnimationEndListener(this._afterEnter, 'afterEnterLocker')

          requestAnimationFrame(() => {
            if (!this._animationNoneReday)
              this.$refs.slot.style.transitionDuration = null
            this.setMaskOpacity(0.25)
          })
        })
      },

      _afterEnter () {
        if (this.animationendTriggered) return

        this._animation('in', true)

        this.vmSlot.event &&
        this.vmSlot.event.afterEnter instanceof Function &&
          this.vmSlot.event.afterEnter()

        this.animationendTriggered = true
      },

      _beforeLeave () {
        requestAnimationFrame(() => {
          this.setMaskOpacity(0)
          this._animation('out')

          this.vmSlot.event &&
          this.vmSlot.event.beforeLeave instanceof Function &&
            this.vmSlot.event.beforeLeave()

          //前一个animationend导致提前触发
          this._freezeEvents()
          setTimeout(() => {
            this._addAnimationEndListener(this._afterLeave, 'afterLeaveLocker')
          }, 28)
        })
      },

      _afterLeave () {
        this._animation('out', true)

        this.vmSlot.event &&
          this.vmSlot.event.afterLeave instanceof Function &&
            this.vmSlot.event.afterLeave()

        requestAnimationFrame(() => {
          this._afterLeaveCallback instanceof Function &&
            this._afterLeaveCallback()
        })
      },

      _freezeEvents () {
        this.$refs.base.addEventListener(
          'touchstart', this._stopPropagation, true)
        this.$refs.base.addEventListener(
          'touchmove', this._stopPropagation, true)
        this.$refs.base.addEventListener(
          'touchend', this._stopPropagation, true)
      },

      _stopPropagation (e) {
        e.stopPropagation()
        e.preventDefault()
      },

      _animation (progressName, unset = false) {
        var animation = this.vmSlot.$popupCtrl.config.animation
        var $dom = this.getAnimateDom()
        var value

        if (animation instanceof Object) {
          value = animation[progressName]

          //string,array被classname设置占用了,只剩下object用于扩展了
          if (value instanceof String) {
            if (unset === false)
              $dom.classList.add(value)
            else
              $dom.classList.remove(value)
          } else if (value instanceof Array) {
            if (unset === false)
              value.forEach(val => $dom.classList.add(val))
            else
              value.forEach(val => $dom.classList.remove(val))
          } else if (value instanceof Object) {
            if (value.effect === 'zoomFromDom')
              this._triggerZoomFromDom(progressName, value, unset)
          }
        }

        animation = null
        $dom = null
        value = null
      },

      _triggerZoomFromDom (progress, value, unset) {
        var $fromDom = value.fromDom || (this.e ? this.e.target : null),
          $slot = this.vmSlot.$el,
          fromDomRect, slotRect,

          scaleAdjusted = 2 / 3,
          translateX, translateY,
          fromDomCenterX, fromDomCenterY,
          slotCenterX, slotCenterY

        if (!$fromDom)
          throw new Error('无法找到zoomFromDom的参考dom节点, 请检查设置')

        if ($fromDom && !unset) {
          this._animationNoneReday = true
          $slot.style.opacity = 0
          requestAnimationFrame(() => {
            slotRect = $slot.getBoundingClientRect()
            fromDomRect = $fromDom.getBoundingClientRect()

            if (value.offset !== undefined)
              scaleAdjusted = value.offset

            slotCenterX = slotRect.left + slotRect.width / 2
            slotCenterY = slotRect.left + slotRect.width / 2
            fromDomCenterX = fromDomRect.left + fromDomRect.width / 2
            fromDomCenterY = fromDomRect.top + fromDomRect.height / 2

            translateX = fromDomCenterX - slotCenterX
            translateY = fromDomCenterY - slotCenterY

            if (progress === 'in') {
              this.$refs.slot.style.transitionDuration = '0ms'
              $slot.style.opacity = 0
              //无论in或者out都是一样的
              $slot.style.transform =
                `translate3d(${translateX * scaleAdjusted}px, ${translateY * scaleAdjusted}px,0) scale(${scaleAdjusted})`

              requestAnimationFrame(() => {
                $slot.style.transform = null
                $slot.style.transitionDuration = null
                this._animationNoneReday = null
                $slot.style.opacity = null
              })
            } else if (progress === 'out') {
              $slot.style.transform =
                `translate3d(${translateX * scaleAdjusted}px, ${translateY * scaleAdjusted}px,0) scale(${scaleAdjusted})`
              $slot.style.opacity = 0
            }
          })
        }
      }
    },

    destroyed () {
      this.$animateDom = null
    }
  }
</script>

<style>
  .vc-popup-base{
    width: 100%;
    height: 100%;
    top: 0;
  }

  .vc-popup-slot{
    position: relative;
    height: 0;
  }

  .vc-popup-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: #000000;
    transition: opacity 350ms ease 0s;
    will-change: opacity;
  }
</style>
