import popUpBase from '../popup-base/popup-base.js'
import template from './popup-bottom-menu.vue'

var popUpConfig = {
}

var defaultConfig = {
}

var incrId = 0
var instancesMap = {}

function BottomMenu (constructConfig) {
  this.constructor = BottomMenu
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

BottomMenu.prototype = popUpBase

export default BottomMenu
