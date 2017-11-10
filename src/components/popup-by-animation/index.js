import popUpBase from '../popup-base/popup-base.js'
import template from './popup-by-animation.vue'

var popUpConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'clickRelative'
}

var incrId = 0
var instancesMap = {}

function PressMenu (constructConfig) {
  this.constructor = PressMenu
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

PressMenu.prototype = popUpBase

export default PressMenu
