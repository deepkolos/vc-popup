import PopupBase from './popup-base'
import Vue from 'vue'

function popupRegister (name, template, popUpConfig, defaultConfig) {
  var incrId = 0
  var instancesMap = {}

  function popupTemplate (constructConfig) {
    this.constructor = popupTemplate
    this.init(
      defaultConfig, constructConfig,
      popUpConfig, instancesMap,
      template, incrId++
    )
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
