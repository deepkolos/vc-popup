import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popUpConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
}

export default popupRegister('over', template, popUpConfig, defaultConfig)
