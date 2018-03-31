import Vue from 'vue'
import Router from './router'
import popupBaseTpl from './popup-base.vue'
import popupContainerTpl from './popup-conatiner.vue'

function top  (arr) { return arr[arr.length - 1] }
function prev (arr) { return arr[arr.length - 2] }
function splitPopupValue (val) {
  return val ? decodeURIComponent(val).split('/') : []
}

var Popup
if (Vue.prototype.__popup__ !== undefined) {
  Popup = Vue.prototype.__popup__
} else {
  require('../../style/basic-animatin.css')
  require('../../style/animation-duration-preset.css')
  var popupContainer = null
  var vmBaseOfRouterId = {}
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

  Vue.prototype.__popup__ = Popup = {
    fromHashChange: false,
    fromUpdateRouter: false,
    popupInShowingNum: 0,

    open (vmBase, routerId) {
      popupContainer.turnOn()
      this.popupInShowingNum++
      vmBase._beforeMount()
      popupContainer.addPopup(vmBase.$el)
      vmBase._afterMount()
      this.updateRouter(routerId)
    },

    close (routerId) {
      var vmBase = vmBaseOfRouterId[routerId]

      vmBase && vmBase._leave(() => {
        if (--this.popupInShowingNum === 0)
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
      var vmBase = vmBaseOfRouterId[routerId]

      vmBaseOfRouterId[routerId] = undefined
      vmBase.isShowing = false
      popupContainer.removePopup(vmBase.$el)
      vmBase.vmSlot.$destroy()
      vmBase.$destroy()
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
      if (Popup.fromUpdateRouter) {
        Popup.fromUpdateRouter = false
        return Popup.fromUpdateRouter
      }

      var list = splitPopupValue(val)
      var trigger = constructorOfRouterId[top(list)]
      Popup.fromHashChange = true
      trigger && trigger()
    },

    onLeave (val, oVal) {
      var oList = splitPopupValue(oVal)
      var list = splitPopupValue(val)
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
}

export { Popup }
export default Popup
