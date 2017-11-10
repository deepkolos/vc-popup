import popUpBase from '../popup-base/popup-base.js'
import template from './popup-center-menu.vue'

var popUpConfig = {
  position: 'center'
}

var defaultConfig = {
}

var incrId = 0
var instancesMap = {}

function CenterMenu (constructConfig) {
  this.constructor = CenterMenu
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

CenterMenu.prototype = popUpBase

export default CenterMenu
