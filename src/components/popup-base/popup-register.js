import PopupBase from './popup-base'
var Vue = null

function popupRegister (name, template, popUpConfig, defaultConfig) {
  var incrId = 0
  var instancesMap = {}

  // 首字母大写
  name = name[0].toUpperCase() + name.slice(1)

  function popupTemplate (constructConfig) {
    this.constructor = popupTemplate
    this.init(
      defaultConfig, constructConfig,
      popUpConfig, instancesMap,
      template, incrId++, Vue
    )
    this.name = name
  }

  popupTemplate.prototype = PopupBase
  if (Vue.prototype.$popup) {
    Vue.prototype.$popup[name] = popupTemplate
  } else {
    Vue.prototype.$popup = {
      [name]: popupTemplate
    }
  }

  return popupTemplate
}

function importVue (vue) {
  Vue = vue
}

export default popupRegister
export {
  importVue,
  popupRegister
}
