import template from './popup-custom.vue'
import { popupRegister } from 'vc-popup-base'

var popupConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative',
  animation: {
    init: 'vc-slide-up-init',
    in: 'vc-slide-up-in',
    out: 'vc-slide-up-out'
  }
}

export default popupRegister('Custom', template, popupConfig, defaultConfig)
