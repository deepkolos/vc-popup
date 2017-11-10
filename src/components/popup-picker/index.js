import popUpBase from '../popup-base/popup-base.js'
import template from './popup-picker.vue'

var popUpConfig = {
}

var defaultConfig = {
}

var incrId = 0
var instancesMap = {}

function Picker (constructConfig) {
  this.constructor = Picker
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

Picker.prototype = popUpBase

export default Picker
