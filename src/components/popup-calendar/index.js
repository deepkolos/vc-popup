import popUpBase from '../popup-base/popup-base.js'
import template from './popup-calendar.vue'

var popUpConfig = {
}

var defaultConfig = {
}

var incrId = 0
var instancesMap = {}

function calendar (constructConfig) {
  this.constructor = calendar
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

calendar.prototype = popUpBase

export default calendar
