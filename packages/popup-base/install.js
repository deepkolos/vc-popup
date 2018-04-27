
import { popupRegister, effectRegister } from '../../src/components/popup-base'

const version = '0.1.12'
const install = function (Vue, config = {}) {
  if (install.installed) return

  require('../../src/components/popup-base')
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  popupRegister,
  effectRegister
}
