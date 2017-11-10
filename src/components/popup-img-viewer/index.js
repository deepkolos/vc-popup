import popUpBase from '../popup-base/popup-base.js'
import template from './popup-img-viewer.vue'

var popUpConfig = {
}

var defaultConfig = {
}

var incrId = 0
var instancesMap = {}

function ImgViewer (constructConfig) {
  this.constructor = ImgViewer
  this.init(
    defaultConfig, constructConfig,
    popUpConfig, instancesMap,
    template, incrId++
  )
}

ImgViewer.prototype = popUpBase

export default ImgViewer
