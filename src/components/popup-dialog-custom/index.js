import popUpBase from '../popup-base/popup-base.js'
import template from './popup-dialog.vue'

var popUpConfig = {
}

var defaultConfig = {
}

var incrId = 0
var instancesMap = {}

function Dialog (constructConfig) {
  this.constructor = Dialog
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

Dialog.prototype = popUpBase

export default Dialog
