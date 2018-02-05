import template from './popup-custom.vue'
import { popupRegister } from 'vc-popup-base'

var popupConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative',
  animation: {
    init: 'animation-init',
    in: 'animation-in',
    out: 'animation-out'
  }
}

export default popupRegister('Custom', template, popupConfig, defaultConfig)
