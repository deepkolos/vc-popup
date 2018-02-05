import { popupRegister } from 'vc-popup-base'
import template from './index.vue'

var popupConfig = {
}

var defaultConfig = {
  position: 'domRelative',
  autoSetOrthocenter: true,
  animationConfigurable: false,
  maskOpacity: 1
}

export default popupRegister('imgViewer', template, popupConfig, defaultConfig)
