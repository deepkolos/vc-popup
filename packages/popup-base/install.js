
import { popupRegister, importVue } from '../../src/components/popup-base'

const version = '0.0.6'
const install = function (Vue, config = {}) {
  if (install.installed) return

  importVue(Vue)
  require('../../src/components/popup-base').default.init(Vue)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  popupRegister
}
