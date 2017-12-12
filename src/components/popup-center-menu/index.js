import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popUpConfig = {
  position: 'center'
}

var defaultConfig = {
}

export default popupRegister('centerMenu', template, popUpConfig, defaultConfig)
