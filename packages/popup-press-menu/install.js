
const version = '0.1.19'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.use(require('vc-popup-base'))
  require('../../src/components/popup-press-menu')
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version
}
