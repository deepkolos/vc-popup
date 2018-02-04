import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'clickRelative'
}

export default popupRegister('pressMenu', template, popupConfig, defaultConfig)
