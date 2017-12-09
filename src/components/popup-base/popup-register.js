import Vue from 'vue'
import PopupBase from './popup-base'

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
  Vue.prototype.$popup[name] = popupTemplate

  return popupTemplate
}

export default popupRegister
