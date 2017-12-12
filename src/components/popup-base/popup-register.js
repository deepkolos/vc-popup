import PopupBase from './popup-base'
import Vue from 'vue'

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
      template, incrId++
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

export default popupRegister
