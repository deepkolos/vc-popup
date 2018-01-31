import Router from './router.js'
import popUpContainerComponent from './popup-conatiner.vue'
import popUpBaseComponent from './popup-base.vue'
import Vue from 'vue'

function top (arr) {
  return arr[arr.length - 1]
}

function prev (arr) {
  return arr[arr.length - 2]
}

let PopUpContainerConstructor = Vue.extend(popUpContainerComponent)
let PopUpBaseConstructor = Vue.extend(popUpBaseComponent)
var containerInBody = document.body.getElementsByClassName('vc-popup-conatiner')
let vmBaseContainer = null

let RouterIdToPopUp = {}
let RouterIdToTrigger = {}
let popUpIdQueue = []

Router.initialParam('popUp')
if (containerInBody.length === 0) {
  vmBaseContainer = new PopUpContainerConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(vmBaseContainer.$el)
} else {
  vmBaseContainer = containerInBody[0].__vue__
}

let PopUp = {
  fromUpdateRouter: false,
  fromHashChange: false,

  open (vmBase, routerId, domLoadCallback) {
    vmBaseContainer.turnOn()
    vmBase._enter()
    popUpIdQueue.push(routerId)
    this.updateRouter(routerId)
    requestAnimationFrame(function () {
      // 和那边的enter和enter的执行位置同步
      vmBaseContainer.addPopUp(vmBase.$el)
      domLoadCallback && domLoadCallback()
      vmBase._afterDomLoad()
    })
  },

  close (routerId) {
    var vmBase = RouterIdToPopUp[routerId]

    vmBase && vmBase._leave(() => {
      this.destroyPopUp(routerId)
      popUpIdQueue.pop()
      if (popUpIdQueue.length === 0) {
        vmBaseContainer.turnOff()
      }
    })
  },

  register (routerId, trigger) {
    RouterIdToTrigger[routerId] = trigger
  },

  createPopUp (config, routerId, e, runtimeConfig) {
    config = Object.assign({}, config)
    config.e = e
    config.routerId = routerId
    config.runtimeConfig = runtimeConfig

    RouterIdToPopUp[routerId] = new PopUpBaseConstructor({
      el: document.createElement('div'),
      propsData: config
    })

    return RouterIdToPopUp[routerId]
  },

  destroyPopUp (routerId) {
    vmBaseContainer.removePopUp(RouterIdToPopUp[routerId].$el)
    RouterIdToPopUp[routerId].$destroy()
    RouterIdToPopUp[routerId] = null
  },

  updateRouter (popUpName) {
    if (this.fromHashChange) {
      this.fromHashChange = false
      return this.fromHashChange
    }

    var value = Router.getParamValue('popUp')
    if (value && value.split('/').pop() !== popUpName) {
      value += '/' + popUpName
    } else {
      value = popUpName
    }

    this.fromUpdateRouter = true
    Router.parseHashCommand('&popUp=' + value)
  }
}

Router.listenParam('popUp', {
  onEnter (val) {
    if (PopUp.fromUpdateRouter) {
      PopUp.fromUpdateRouter = false
      return PopUp.fromUpdateRouter
    }

    var list = val ? val.split('/') : []
    var trigger = RouterIdToTrigger[top(list)]
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

export default PopUp
export { PopUp }
