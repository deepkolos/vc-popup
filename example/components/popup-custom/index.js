import template from './popup-custom.vue'
import Vue from 'vue'

var popUpConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
}

export default Vue.prototype.popupRegister('Custom', template, popUpConfig, defaultConfig)
