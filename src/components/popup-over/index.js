import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

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

export default popupRegister('popover', template, popupConfig, defaultConfig)
