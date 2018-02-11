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
  import { effectStack } from './effect-register'

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

      wrapSlotWith (TplConstructor, props) {
        var vmWrapper = new TplConstructor({
          el: document.createElement('div'),
          propsData: props
        })
        vmWrapper.$refs.slot.appendChild(this.$refs.slot)
        this.$refs.slotContainer.appendChild(vmWrapper.$el)
        this.vmWrapper = vmWrapper
        return vmWrapper
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
          if (this.runtimeConfig.lockScroll)
            document.body.style.overflow = 'hidden'
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

          this.setMaskOpacity(animationCfg !== false ? 0 : maskOpacity)

          if (this._animationConfigurable) {
            this._animation('in')
            this._animation('init')
          }

          this.vmSlot.popupEvt.beforeEnter instanceof Function &&
            this.vmSlot.popupEvt.beforeEnter(hasConfigAnimation)

          !hasConfigAnimation &&
            this.vmSlot.popupEvt.inAnimation instanceof Function &&
              this.vmSlot.popupEvt.inAnimation()

          this.runtimeConfig.beforeEnter instanceof Function &&
            this.runtimeConfig.beforeEnter()

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

        this.runtimeConfig.afterEnter instanceof Function &&
          this.runtimeConfig.afterEnter()

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

          this.setMaskOpacity(animationCfg !== false ? 0 : 0.25)
          this._animationConfigurable &&
            this._animation('out')

          this.vmSlot.popupEvt.beforeLeave instanceof Function &&
            this.vmSlot.popupEvt.beforeLeave(hasConfigAnimation)

          !hasConfigAnimation &&
            this.vmSlot.popupEvt.outAnimation instanceof Function &&
              this.vmSlot.popupEvt.outAnimation()

          this.runtimeConfig.beforeLeave instanceof Function &&
            this.runtimeConfig.beforeLeave()

          this._addAnimationEndListener(this._afterLeave, 'afterLeaveLocker')
        })
      },

      _afterLeave () {
        this._animationConfigurable &&
          this._animation('out', true)

        this.vmSlot.popupEvt.afterLeave instanceof Function &&
          this.vmSlot.popupEvt.afterLeave()

        this.runtimeConfig.afterLeave instanceof Function &&
          this.runtimeConfig.afterLeave()

        this._afterLeaveCallback instanceof Function &&
          this._afterLeaveCallback()

        document.body.style.overflow = ''
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
        var cfg

        var parseString = (val) => {
          if (typeof val === 'string') {
            if (unset === false)
              $dom.classList.add(val)
            else
              $dom.classList.remove(val)
          }
        }
        var parseObject = (val) => {
          if (val instanceof Object) {
            if (effectStack[val.effect])
              effectStack[val.effect].call(null, progressName, val, unset, this)
          }
        }

        if (animation instanceof Object) {
          cfg = animation[progressName]

          //string,array被classname设置占用了,只剩下object用于扩展了,boolean用于开关
          if (cfg === false) {
            if (unset === false)
              $dom.classList.add(animationOffClass)
            else
              $dom.classList.remove(animationOffClass)
          } else

          if (cfg instanceof Array) {
            cfg.forEach(function (val) {
              parseString(val)
              parseObject(val)
            })
          } else {
            parseString(cfg)
            parseObject(cfg)
          }
        }
      },

      _initMask () {
        if (this.runtimeConfig.positionType === 'absolute') {
          // 因为背景没有文字, 所以可以使用动画偏移
          this.$refs.mask.style.transform =
            `translate(${window.scrollX}px,${window.scrollY}px)`

          // mask就跟踪好了, 不使用fixed来做定位的了
          if (!this.runtimeConfig.lockScroll)
            window.addEventListener('scroll', this._maskFollowScroll)
        }
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
</style>
