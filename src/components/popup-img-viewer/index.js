import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
}

var defaultConfig = {
  position: 'domRelative',
  autoSetOrthocenter: true,
  animationConfigurable: false
}

export default popupRegister('imgViewer', template, popupConfig, defaultConfig)
