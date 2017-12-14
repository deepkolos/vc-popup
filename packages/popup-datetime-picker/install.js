
const version = '0.0.2'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.use(require('vc-popup-base'))
  require('../../src/components/popup-datetime-picker')
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version
}
