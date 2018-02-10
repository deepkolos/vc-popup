import template from './popup-custom.vue'
import { popupRegister } from 'vc-popup-base'

var popupConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative',
  animation: {
    init: 'vc-animation-init',
    in: 'vc-animation-in',
    out: 'vc-animation-out'
  }
}

export default popupRegister('Custom', template, popupConfig, defaultConfig)
