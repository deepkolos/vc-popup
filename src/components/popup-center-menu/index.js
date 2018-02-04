import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
  position: 'center'
}

var defaultConfig = {
  animationConfigurable: false
}

export default popupRegister('centerMenu', template, popupConfig, defaultConfig)
