import Vue from 'vue'
import Router from './router.js'
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
var PopUpBaseConstructor = Vue.extend(popupBaseTpl)
var PopUpContainerConstructor = Vue.extend(popupContainerTpl)
var containerInBody = document.body.getElementsByClassName('vc-popup-conatiner')

Router.initialParam('popup')
if (containerInBody.length === 0) {
  popupContainer = new PopUpContainerConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(popupContainer.$el)
} else {
  popupContainer = containerInBody[0].__vue__
}

var PopUp = {
  fromHashChange: false,
  fromUpdateRouter: false,

  open (vmBase, routerId, domLoadCallback) {
    vmBase._enter(() => {
      popupContainer.turnOn()
      popupContainer.addPopUp(vmBase.$el)
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
      this.destroyPopUp(routerId)
    })
  },

  register (routerId, trigger) {
    constructorOfRouterId[routerId] = trigger
  },

  createPopUp (config, runtimeConfig, routerId) {
    config.routerId = routerId
    config.runtimeConfig = runtimeConfig
    config.e = runtimeConfig.propsData.e

    return (vmBaseOfRouterId[routerId] = new PopUpBaseConstructor({
      el: document.createElement('div'),
      propsData: config
    }))
  },

  destroyPopUp (routerId) {
    popupContainer.removePopUp(vmBaseOfRouterId[routerId].$el)
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
    if (PopUp.fromUpdateRouter) {
      PopUp.fromUpdateRouter = false
      return PopUp.fromUpdateRouter
    }

    var list = val ? val.split('/') : []
    var trigger = constructorOfRouterId[top(list)]
    PopUp.fromHashChange = true
    trigger && trigger()
  },

  onLeave (val, oVal) {
    var oList = oVal ? oVal.split('/') : []
    var list = val ? val.split('/') : []
    var oListTop = top(oList)

    if (prev(list) !== oListTop) {
      PopUp.fromUpdateRouter = false
      PopUp.fromHashChange = false
      PopUp.close(oListTop)
    }
  },

  onBack (val) {

  }
})

export { PopUp }
export default PopUp
