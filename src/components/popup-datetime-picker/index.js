import popUpBase from '../popup-base/popup-base.js'
import template from './popup-datetime-picker.vue'

var popUpConfig = {
}

var defaultConfig = {
}

var incrId = 0
var instancesMap = {}

function DateTimePicker (constructConfig) {
  this.constructor = DateTimePicker
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

DateTimePicker.prototype = popUpBase

export default DateTimePicker
