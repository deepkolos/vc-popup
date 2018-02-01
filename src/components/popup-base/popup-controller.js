import Vue from 'vue'
import Router from './router.js'
import popUpBaseTpl from './popup-base.vue'
import popUpContainerTpl from './popup-conatiner.vue'

function top (arr) {
  return arr[arr.length - 1]
}

function prev (arr) {
  return arr[arr.length - 2]
}

var popUpContainer = null
var vmBaseOfRouterId = {}
var popUpInShowingNum = 0
var constructorOfRouterId = {}
var PopUpBaseConstructor = Vue.extend(popUpBaseTpl)
var PopUpContainerConstructor = Vue.extend(popUpContainerTpl)
var containerInBody = document.body.getElementsByClassName('vc-popup-conatiner')

Router.initialParam('popUp')
if (containerInBody.length === 0) {
  popUpContainer = new PopUpContainerConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(popUpContainer.$el)
} else {
  popUpContainer = containerInBody[0].__vue__
}

var PopUp = {
  fromHashChange: false,
  fromUpdateRouter: false,

  open (vmBase, routerId, domLoadCallback) {
    popUpContainer.turnOn()
    vmBase._enter()
    popUpInShowingNum++
    this.updateRouter(routerId)
    requestAnimationFrame(function () {
      // 和那边的enter和enter的执行位置同步
      popUpContainer.addPopUp(vmBase.$el)
      domLoadCallback && domLoadCallback()
      vmBase._afterDomLoad()
    })
  },

  close (routerId) {
    var vmBase = vmBaseOfRouterId[routerId]

    vmBase && vmBase._leave(() => {
      this.destroyPopUp(routerId)
      popUpInShowingNum--
      if (popUpInShowingNum === 0) {
        popUpContainer.turnOff()
      }
    })
  },

  register (routerId, trigger) {
    constructorOfRouterId[routerId] = trigger
  },

  createPopUp (config, runtimeConfig, routerId) {
    config.routerId = routerId
    config.runtimeConfig = runtimeConfig

    return (vmBaseOfRouterId[routerId] = new PopUpBaseConstructor({
      el: document.createElement('div'),
      propsData: config
    }))
  },

  destroyPopUp (routerId) {
    popUpContainer.removePopUp(vmBaseOfRouterId[routerId].$el)
    vmBaseOfRouterId[routerId].$destroy()
    vmBaseOfRouterId[routerId] = undefined
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
