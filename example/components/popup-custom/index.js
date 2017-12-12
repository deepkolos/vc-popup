import template from './popup-custom.vue'
import { popupRegister } from 'vc-popup-base'

var popUpConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
}

export default popupRegister('Custom', template, popUpConfig, defaultConfig)
