import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
  position: 'center'
}

var defaultConfig = {
  animation: {
    init: 'vc-zoom-init',
    in: 'vc-zoom-in',
    out: 'vc-zoom-out'
  }
}

export default popupRegister('centerMenu', template, popupConfig, defaultConfig)
