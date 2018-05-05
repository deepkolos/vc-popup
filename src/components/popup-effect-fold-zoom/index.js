import Vue from 'vue'
import './animation.css'
import { effectRegister } from 'vc-popup-base'
import template from './svg.vue'
import Snap from 'snapsvg'

var duration = 400
var SvgTplConstructor = Vue.extend(template)

effectRegister('foldZoom', {
  beforeMount: function (cfg, vmBase) {
    var vmSvg = vmBase.wrapSlotWith(SvgTplConstructor, {})
    var snap = Snap(vmSvg.$refs.svg)
    var path = snap.select('path')
    var steps = {
      open: vmSvg.$refs.morph.getAttribute('data-morph-open'),
      close: vmSvg.$refs.morph.getAttribute('data-morph-close')
    }

    vmBase.vmSlot.__effectFoldZoomStore = {
      snap: snap,
      path: path,
      steps: steps,
      vmSvg: vmSvg
    }

    duration = cfg.duation || duration
    vmSvg.setPathColor(cfg.bgColor)
    vmBase.vmSlot.$el.style.background = 'none'

    var $el = vmSvg.$el
    var $slot = vmBase.vmSlot.$el

    $el.style.animationDuration = duration + 'ms'
    $el.classList.add(
      'vc-effect-fold-zoom-inital',
      'vc-effect-fold-zoom-animation',
      'vc-effect-fold-zoom-in'
    )
    $slot.classList.add(
      'vc-effect-fold-zoom-inner-init',
      'vc-effect-fold-zoom-inner-in'
    )
    requestAnimationFrame(function () {
      $el.classList.remove('vc-effect-fold-zoom-inital')
      $slot.classList.remove('vc-effect-fold-zoom-inner-init')

      path.stop().animate({
        'path': steps.open
      }, duration, window.mina.easeinout)
    })
  },
  beforeLeave: function (cfg, vmBase) {
    var {steps, path, vmSvg} = vmBase.vmSlot.__effectFoldZoomStore
    var $el = vmSvg.$el
    var $slot = vmBase.vmSlot.$el

    $el.style.animationDuration = duration + 'ms'

    $el.classList.remove('vc-effect-fold-zoom-in')
    $el.classList.add('vc-effect-fold-zoom-out')
    $slot.classList.remove('vc-effect-fold-zoom-inner-in')
    $slot.classList.add('vc-effect-fold-zoom-inner-out')

    path.stop().animate({
      'path': steps.close
    }, duration, window.mina.easeinout)
  }
})
