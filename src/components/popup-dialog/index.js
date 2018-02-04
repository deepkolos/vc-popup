import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
  position: 'center'
}

var defaultConfig = {
}

export default popupRegister('dialog', template, popupConfig, defaultConfig)
