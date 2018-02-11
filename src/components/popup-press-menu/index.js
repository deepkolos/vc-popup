import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'clickRelative',
  animation: {
    init: 'vc-slide-up-init',
    in: 'vc-slide-up-in',
    out: 'vc-slide-up-out'
  }
}

export default popupRegister('pressMenu', template, popupConfig, defaultConfig)
