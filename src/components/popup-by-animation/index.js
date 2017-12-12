import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popUpConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'clickRelative'
}

export default popupRegister('byAnimation', template, popUpConfig, defaultConfig)
