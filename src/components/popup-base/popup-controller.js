import Vue from 'vue'
import Router from './router'
import popupBaseTpl from './popup-base.vue'
import popupContainerTpl from './popup-conatiner.vue'

function top (arr) {
  return arr[arr.length - 1]
}

function prev (arr) {
  return arr[arr.length - 2]
}

var popupContainer = null
var vmBaseOfRouterId = {}
var popupInShowingNum = 0
var constructorOfRouterId = {}
var PopupBaseConstructor = Vue.extend(popupBaseTpl)
var PopupContainerConstructor = Vue.extend(popupContainerTpl)
var containerInBody = document.body.getElementsByClassName('vc-popup-conatiner')

Router.initialParam('popup')
if (containerInBody.length === 0) {
  popupContainer = new PopupContainerConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(popupContainer.$el)
} else {
  popupContainer = containerInBody[0].__vue__
}

var Popup = {
  fromHashChange: false,
  fromUpdateRouter: false,

  open (vmBase, routerId, domLoadCallback) {
    vmBase._enter(() => {
      popupContainer.turnOn()
      popupContainer.addPopup(vmBase.$el)
      domLoadCallback && domLoadCallback()
      vmBase._afterDomLoad()
      popupInShowingNum++
      this.updateRouter(routerId)
    })
  },

  close (routerId) {
    var vmBase = vmBaseOfRouterId[routerId]

    vmBase && vmBase._leave(() => {
      if (--popupInShowingNum === 0)
        popupContainer.turnOff()
      this.destroyPopup(routerId)
    })
  },

  register (routerId, trigger) {
    constructorOfRouterId[routerId] = trigger
  },

  createPopup (config, runtimeConfig, routerId) {
    config.runtimeConfig = runtimeConfig
    config.e = runtimeConfig.propsData.e

    return (vmBaseOfRouterId[routerId] = new PopupBaseConstructor({
      el: document.createElement('div'),
      propsData: config
    }))
  },

  destroyPopup (routerId) {
    popupContainer.removePopup(vmBaseOfRouterId[routerId].$el)
    vmBaseOfRouterId[routerId].$destroy()
    vmBaseOfRouterId[routerId] = undefined
  },

  updateRouter (popupName) {
    if (this.fromHashChange) {
      this.fromHashChange = false
      return this.fromHashChange
    }

    var value = Router.getParamValue('popup')
    if (value && value.split('/').pop() !== popupName) {
      value += '/' + popupName
    } else {
      value = popupName
    }

    this.fromUpdateRouter = true
    Router.parseHashCommand('&popup=' + value)
  }
}

Router.listenParam('popup', {
  onEnter (val) {
    console.log(constructorOfRouterId)
    if (Popup.fromUpdateRouter) {
      Popup.fromUpdateRouter = false
      return Popup.fromUpdateRouter
    }

    var list = val ? val.split('/') : []
    var trigger = constructorOfRouterId[top(list)]
    Popup.fromHashChange = true
    trigger && trigger()
  },

  onLeave (val, oVal) {
    var oList = oVal ? oVal.split('/') : []
    var list = val ? val.split('/') : []
    var oListTop = top(oList)

    if (prev(list) !== oListTop) {
      Popup.fromUpdateRouter = false
      Popup.fromHashChange = false
      Popup.close(oListTop)
    }
  },

  onBack (val) {

  }
})

export default Popup
export { Popup, popupInShowingNum }
