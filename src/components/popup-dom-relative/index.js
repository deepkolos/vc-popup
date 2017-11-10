import popUpBase from '../popup-base/popup-base.js'
import template from './popup-dom-relative.vue'

var popUpConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
  // 手工指定节点,通过config导入, 属性名为referredDom
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
