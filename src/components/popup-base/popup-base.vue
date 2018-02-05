<template>
  <div class="vc-popup-base"
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
      this._removeAnimationEndListener = null
      this._animationConfigurable = null
    },

    methods: {
      // 以下是提供给外部使用的
      setMaskOpacity (val) {
        this.$refs.mask.style.opacity = val
      },

      setMaskBgColor (val) {
        this.$refs.mask.style.backgroundColor = val
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
        this.vmSlot.popupEvt &&
        this.vmSlot.popupEvt.afterDomLoad &&
          this.vmSlot.popupEvt.afterDomLoad()
      },

      _enter (openRestFunc) {
        this._beforeEnter(openRestFunc)
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
        this.runtimeConfig.lockScroll &&
          e.preventDefault()
      },

      _addAnimationEndListener (callback, lock) {
        var $dom = this.$animateDom || this.$refs.slot

        this[lock] = false

        var onAnimationEnd = (e) => {
          if (e.target === $dom) {
            if (this[lock]) return

            this._removeAnimationEndListener()
            callback instanceof Function && callback()
            this[lock] = true
          }
        }

        $dom.addEventListener('transitionend', onAnimationEnd)
        $dom.addEventListener('animationend',  onAnimationEnd)
        this.hasAnimationEndListener = true

        this._removeAnimationEndListener = () => {
          if (this.hasAnimationEndListener) {
            $dom.removeEventListener('transitionend', onAnimationEnd)
            $dom.removeEventListener('animationend',  onAnimationEnd)
            this.hasAnimationEndListener = false
          }
        }
      },

      _beforeEnter (openRestFunc) {
        requestAnimationFrame(() => {
          this._initMask()
          this.$refs.slot.style.transitionDuration = '0ms'

          this._animationConfigurable =
            this.runtimeConfig.animationConfigurable

          var className = this.runtimeConfig.className
          var animationCfg = this.runtimeConfig.animation.in
          var maskOpacity = this.runtimeConfig.maskOpacity || 0.25
          var maskBgColor = this.runtimeConfig.maskBgColor
          var hasConfigAnimation =
                this._animationConfigurable &&
                animationCfg !== undefined

          if (typeof className === 'string')
            this.vmSlot.$el.classList.add(className)
          else if (className instanceof Array)
            this.vmSlot.$el.classList.add.apply(
              this.vmSlot.$el.classList, className)

          if (animationCfg !== false)
            this.setMaskOpacity(0)
          else
            this.setMaskOpacity(maskOpacity)

          if (this._animationConfigurable) {
            this._animation('in')
            this._animation('init')
          }

          this.vmSlot.popupEvt.beforeEnter instanceof Function &&
            this.vmSlot.popupEvt.beforeEnter(hasConfigAnimation)

          !hasConfigAnimation &&
            this.vmSlot.popupEvt.inAnimation instanceof Function &&
              this.vmSlot.popupEvt.inAnimation()

          this.vmSlot.onOpen instanceof Function &&
            this.vmSlot.onOpen()

          requestAnimationFrame(() => {
            this._addAnimationEndListener(this._afterEnter, 'afterEnterLocker')
            if (!this._animationNoneReday)
              this.$refs.slot.style.transitionDuration = null

            this.setMaskOpacity(maskOpacity)
            maskBgColor && this.setMaskBgColor(maskBgColor)

            if (this._animationConfigurable)
              this._animation('init', true)
          })

          openRestFunc()
        })
      },

      _afterEnter () {
        if (this.animationendTriggered) return

        this._animationConfigurable &&
          this._animation('in', true)

        this.vmSlot.popupEvt.afterEnter instanceof Function &&
          this.vmSlot.popupEvt.afterEnter()

        this.animationendTriggered = true
      },

      _beforeLeave () {
        this._freezeEvents()
        this._removeAnimationEndListener()
        requestAnimationFrame(() => {
          var animationCfg = this.runtimeConfig.animation.out
          var hasConfigAnimation =
                this._animationConfigurable &&
                animationCfg !== undefined

          if (animationCfg !== false)
            this.setMaskOpacity(0)
          else
            this.setMaskOpacity(0.25)

          this._animationConfigurable &&
            this._animation('out')

          this.vmSlot.popupEvt.beforeLeave instanceof Function &&
            this.vmSlot.popupEvt.beforeLeave(hasConfigAnimation)

          !hasConfigAnimation &&
            this.vmSlot.popupEvt.outAnimation instanceof Function &&
              this.vmSlot.popupEvt.outAnimation()

          this._addAnimationEndListener(this._afterLeave, 'afterLeaveLocker')

          this.vmSlot.onClose instanceof Function &&
            this.vmSlot.onClose()
        })
      },

      _afterLeave () {
        this._animationConfigurable &&
          this._animation('out', true)

        this.vmSlot.popupEvt.afterLeave instanceof Function &&
          this.vmSlot.popupEvt.afterLeave()

        this._afterLeaveCallback instanceof Function &&
          this._afterLeaveCallback()
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
        var $dom = this.getAnimateDom()
        var animation = this.runtimeConfig.animation
        var animationOffClass = 'vc-animation-fake-off-' + progressName
        var value

        if (animation instanceof Object) {
          value = animation[progressName]

          //string,array被classname设置占用了,只剩下object用于扩展了,boolean用于开关
          if (value === false) {
            if (unset === false)
              $dom.classList.add(animationOffClass)
            else
              $dom.classList.remove(animationOffClass)
          } else

          if (typeof value === 'string') {
            if (unset === false)
              $dom.classList.add(value)
            else
              $dom.classList.remove(value)
          } else

          if (value instanceof Array) {
            if (unset === false)
              $dom.classList.add.apply($dom.classList, value)
            else
              $dom.classList.remove.apply($dom.classList, value)
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
      },

      _initMask () {
        // 因为背景没有文字, 所以可以使用动画偏移
        this.$refs.mask.style.transform =
          `translate(${window.scrollX}px,${window.scrollY}px)`

        // mask就跟踪好了, 不使用fixed来做定位的了
        if (!this.runtimeConfig.lockScroll)
          window.addEventListener('scroll', this._maskFollowScroll)
      },

      _maskFollowScroll () {
        this.$refs.mask.style.transitionDuration = '0ms'
        this.$refs.mask.style.transform =
          `translate(${window.scrollX}px,${window.scrollY}px)`
      }
    },

    destroyed () {
      this.$animateDom = null
      window.removeEventListener('scroll', this._maskFollowScroll)
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
    z-index: 0;
    height: 0;
  }

  .vc-popup-mask {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: 0;
    background-color: #000000;
    transition: opacity 350ms ease 0s;
    will-change: opacity;
  }

  .vc-animation-fake-off-in {
    animation: vc-animation-fake-off 10ms ease forwards;
  }

  .vc-animation-fake-off-out {
    animation: vc-animation-fake-off 10ms ease reverse;
  }

  @keyframes vc-animation-fake-off {
    0%  {opacity: 0.99;}
    100%{opacity: 1;}
  }
</style>
