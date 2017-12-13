
import { popupRegister } from '../../src/components/popup-base'

const version = '0.0.1'
const install = function (Vue, config = {}) {
  if (install.installed) return

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
