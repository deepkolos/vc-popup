import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
}

var defaultConfig = {
  animation: {
    init: 'vc-slide-up-init',
    in: 'vc-slide-up-in',
    out: 'vc-slide-up-out'
  },
  position: {
    bottom: 0
  }
}

export default popupRegister('datetimePicker', template, popupConfig, defaultConfig)
