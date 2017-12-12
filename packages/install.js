
const version = '1.0.9'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.use(require('popup-base'))
  require('path/to/popup')
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version
}
