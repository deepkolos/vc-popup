import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
}

var defaultConfig = {
  animation: {
    init: 'init',
    in: 'in',
    out: 'out'
  }
}

export default popupRegister('calendar', template, popupConfig, defaultConfig)
