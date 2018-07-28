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
      this.isShowing = false
      this.$animateDom = null
      this.afterEnterLocker = false
      this.afterLeaveLocker = false
      this._onOpenTimestamp = null
      this._animationConfigurable = null
      this._removeAnimationEndListener = null
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
        this.$refs.mask.style.webkitTransitionDuration = '0ms'
      },

      trunOnMaskTransition () {
        this.$refs.mask.style.webkitTransitionDuration = ''
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
        this.$refs.slotContainer.appendChild(vmWrapper.$el)
        vmWrapper.$refs.slot.appendChild(this.$refs.slot)
        this.vmWrapper = vmWrapper
        return vmWrapper
      },

      //内部使用的
      _turnOffMask () {
        !this.maskDisable &&
          this.vmSlot.$popupCtrl.close()
      },

      _maskPreventScroll (e) {
        this.isShowing === true &&
        this.runtimeConfig.lockScroll &&
        this.$refs.base === e.target &&
          e.preventDefault()
      },

      _addAnimationEndListener (callback, lock) {
        var $dom = this.$animateDom || this.$refs.slot
        var safeBellTimer;

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

        if (callback === this._afterLeave && Date.now() - this._onOpenTimestamp < 200) {
          // 快速关闭的时候, 会导致animationEnd不会触发
          safeBellTimer = setTimeout(() => {
            onAnimationEnd({
              target: $dom
            })
          }, 200)
        }

        this._removeAnimationEndListener = () => {
          if (this.hasAnimationEndListener) {
            $dom.removeEventListener('transitionend', onAnimationEnd)
            $dom.removeEventListener('animationend',  onAnimationEnd)
            this.hasAnimationEndListener = false

            if (safeBellTimer) clearTimeout(safeBellTimer)
          }
        }
      },

      _beforeMount () {
        this.$refs.slot.style.webkitTransitionDuration = '0ms'
        if (this.runtimeConfig.lockScroll)
          document.body.style.overflow = 'hidden'

        var className = this.runtimeConfig.className
        this._animationConfigurable =
          this.runtimeConfig.animationConfigurable

        if (typeof className === 'string')
          this.vmSlot.$el.classList.add(className)
        else if (className instanceof Array)
          this.vmSlot.$el.classList.add.apply(
            this.vmSlot.$el.classList, className)

        this.vmSlot.popupEvt.beforeMount &&
          this.vmSlot.popupEvt.beforeMount()

        this._animation('beforeMount')
      },

      _afterMount () {
        this.vmSlot.$popupCtrl.configPosition(this.e)

        this._animation('afterMount')
        this._enter()

        this.vmSlot.popupEvt.afterMount &&
          this.vmSlot.popupEvt.afterMount()
      },

      _enter () {
        this._beforeEnter()
        this.isShowing = true
        this._onOpenTimestamp = Date.now()
      },

      _leave (callback) {
        this._afterLeaveCallback = callback
        this._beforeLeave()
        this.isShowing = false
      },

      _beforeEnter () {
        this._initMask()

        var animationCfg = this.runtimeConfig.animation.in
        var maskOpacity = this.runtimeConfig.maskOpacity || 0.25
        var maskBgColor = this.runtimeConfig.maskBgColor
        var hasConfigAnimation =
          this._animationConfigurable && animationCfg !== undefined

        this.setMaskOpacity(animationCfg !== false ? 0 : maskOpacity)

        this._animation('beforeEnter')
        this._animation('init')

        this.vmSlot.popupEvt.beforeEnter instanceof Function &&
          this.vmSlot.popupEvt.beforeEnter(hasConfigAnimation)

        !hasConfigAnimation &&
          this.vmSlot.popupEvt.inAnimation instanceof Function &&
            this.vmSlot.popupEvt.inAnimation()

        this.runtimeConfig.beforeEnter instanceof Function &&
          this.runtimeConfig.beforeEnter()

        this.getAnimateDom().style.webkitTransitionDuration = '0ms'
        requestAnimationFrame(() => {
          this._addAnimationEndListener(this._afterEnter, 'afterEnterLocker')
          this.$refs.slot.style.webkitTransitionDuration = ''
          this.getAnimateDom().style.webkitTransitionDuration = ''
          this.getAnimateDom().classList.add('vc-popup-default-transition')

          this.setMaskOpacity(maskOpacity)
          maskBgColor && this.setMaskBgColor(maskBgColor)
        })
      },

      _afterEnter () {
        if (this.animationendTriggered) return

        this._animation('afterEnter')

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
          this._animation('beforeLeave')

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
        this._animation('afterLeave')

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

      _animation (evt) {
        var animation = this.runtimeConfig.animation
        if (!this._animationConfigurable) return
        if (animation instanceof Object === false) return

        var cfg
        var $dom = this.getAnimateDom()
        var isPowerByTransition = animation.init !== undefined
        var animationOffClass = 'vc-animation-fake-off-' + evt
        var evtToCfg = {
          beforeMount: 'in',
          afterMount: 'in',
          beforeEnter: 'in',
          afterEnter: 'in',
          beforeLeave: 'out',
          afterLeave: 'out',
          init: 'init'
        }

        var parseString = (val, unset) => {
          if (typeof val === 'string') {
            if (!unset)
              $dom.classList.add(val)
            else
              $dom.classList.remove(val)
          }
        }
        var parseBoolean = (val, unset) => {
          if (typeof val === 'boolean') {
            if (!unset)
              $dom.classList.add(animationOffClass)
            else
              $dom.classList.remove(animationOffClass)
          }
        }
        var parseObject = (val) => {
          var effect
          if (val instanceof Object) {
            effect = effectStack[val.effect]
            if (effect)
              effect[evt] instanceof Function && effect[evt](val, this)
          }
        }

        cfg = animation[evtToCfg[evt]]
        if (cfg === undefined) return

        if (
          evt === 'beforeMount' ||
          evt === 'afterMount'  ||
          evt === 'afterLeave'
        ) {
          parseObject(cfg)
          cfg instanceof Array &&
            cfg.forEach(function (val) {
              parseObject(val)
            })
        } else
        if (evt === 'init') {
          parseString(cfg)
          cfg instanceof Array &&
            cfg.forEach(function (val) {
              parseString(val)
            })
        } else
        if (evt === 'beforeEnter') {
          parseBoolean(cfg)
          parseString(cfg)
          parseObject(cfg)
          isPowerByTransition && this.$nextTick(requestAnimationFrame(function () {
            parseString(cfg, true)
          }))
          cfg instanceof Array &&
            cfg.forEach(function (val) {
              parseString(val)
              parseObject(val)
            })
        } else
        if (evt === 'afterEnter') {
          parseBoolean(cfg, true)
          parseString(cfg, true)
          parseObject(cfg)
          cfg instanceof Array &&
            cfg.forEach(function (val) {
              parseString(val, true)
              parseObject(val)
            })
        } else
        if (evt === 'beforeLeave') {
          parseBoolean(cfg)
          parseString(cfg)
          parseObject(cfg)
          cfg instanceof Array &&
            cfg.forEach(function (val) {
              parseString(val)
              parseObject(val)
            })
        }
      },

      _initMask () {
        if (this.runtimeConfig.positionType === 'absolute') {
          // 因为背景没有文字, 所以可以使用动画偏移
          this.$refs.mask.style.webkitTransform =
            `translate(${window.scrollX}px,${window.scrollY}px)`

          // mask就跟踪好了, 不使用fixed来做定位的了
          if (!this.runtimeConfig.lockScroll)
            window.addEventListener('scroll', this._maskFollowScroll)
        }
      },

      _maskFollowScroll () {
        this.$refs.mask.style.webkitTransitionDuration = '0ms'
        this.$refs.mask.style.webkitTransform =
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

  .vc-popup-default-transition {
    transition: all 280ms ease;
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
    /* will-change: opacity; */
  }
</style>
