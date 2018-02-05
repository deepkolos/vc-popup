import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'clickRelative',
  animation: {
    init: 'animation-init',
    in: 'animation-in',
    out: 'animation-out'
  }
}

export default popupRegister('pressMenu', template, popupConfig, defaultConfig)
