import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
}

var defaultConfig = {
  animation: {
    init: 'vc-init',
    in: 'vc-in',
    out: 'vc-out'
  }
}

export default popupRegister('bottomMenu', template, popupConfig, defaultConfig)
