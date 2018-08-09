
var effectStack = {}

function effectRegister (name, processor) {
  if (effectStack[name] !== undefined)
    console.log(`注意已存在${name}的effect, 已覆盖`)
  effectStack[name] = processor
}

// 注册内置effect

/**
 * zoomFromDom 效果是从触发事件点击的dom节点开始放大, 如其名
 * fromDom: HTMLElemet
 */
effectRegister('zoomFromDom', {
  beforeEnter: function (cfg, vmBase) {
    var $fromDom = cfg.fromDom || (vmBase.e ? vmBase.e.target : null),
      $slot = vmBase.vmSlot.$el,
      fromDomRect, slotRect,

      scaleAdjusted = 2 / 3,
      translateX, translateY,
      fromDomCenterX, fromDomCenterY,
      slotCenterX, slotCenterY

    if (!$fromDom)
      throw new Error('无法找到zoomFromDom的参考dom节点, 请检查设置')

    if ($fromDom) {
      slotRect = $slot.getBoundingClientRect()
      fromDomRect = $fromDom.getBoundingClientRect()

      if (cfg.scale !== undefined)
        scaleAdjusted = cfg.scale

      slotCenterX = slotRect.left + slotRect.width / 2
      slotCenterY = slotRect.top + slotRect.height / 2
      fromDomCenterX = fromDomRect.left + fromDomRect.width / 2
      fromDomCenterY = fromDomRect.top + fromDomRect.height / 2

      translateX = fromDomCenterX - slotCenterX
      translateY = fromDomCenterY - slotCenterY

      $slot._x = translateX * scaleAdjusted
      $slot._y = translateY * scaleAdjusted
      $slot._scale = scaleAdjusted

      //无论in或者out都是一样的
      $slot.style.opacity = 0
      $slot.style.webkitTransform =
        `translate3d(${$slot._x}px, ${$slot._y}px,0) scale(${$slot._scale})`

      vmBase.$nextTick(function () {
        requestAnimationFrame(function () {
          $slot.style.webkitTransform = null
          $slot.style.webkitTransitionDuration = null
          $slot.style.opacity = null
        })
      })
    }
  },
  beforeLeave: function (cfg, vmBase) {
    var $slot = vmBase.vmSlot.$el

    $slot.style.opacity = 0
    $slot.style.webkitTransform =
      `translate3d(${$slot._x}px, ${$slot._y}px,0) scale(${$slot._scale})`
  }
})

/**
 * addClass 方便添加class的工具, 算是一个内置的拓展, 增加onDom的配置
 * value: String | Array
 * onDom: HTMLElemet | String(parse by document.querySelector)
 */
effectRegister('addClass', {
  beforeEnter: function (cfg, vmBase) {
    var $dom = vmBase.vmSlot.$el

    if (typeof cfg.onDom === 'string')
      $dom = document.querySelector(cfg.onDom)
    else if (cfg.onDom instanceof HTMLElement)
      $dom = cfg.onDom

    if (typeof cfg.value === 'string')
      $dom.classList.add(cfg.value)
    else if (cfg.value instanceof Array)
      $dom.classList.add.apply($dom.classList, cfg.value)
  },
  beforeLeave: function (cfg, vmBase) {
    var $dom = vmBase.vmSlot.$el

    if (typeof cfg.onDom === 'string')
      $dom = document.querySelector(cfg.onDom)
    else if (cfg.onDom instanceof HTMLElement)
      $dom = cfg.onDom

    if (typeof cfg.value === 'string')
      $dom.classList.add(cfg.value)
    else if (cfg.value instanceof Array)
      $dom.classList.add.apply($dom.classList, cfg.value)
  }
})

/**
 * bodyBlur 实现模糊效果, 等同于addClass到#app而已, 这是图个方便
 */
effectRegister('bodyBlur', {
  beforeEnter: function () {
    document.querySelector('#app').style.filter = 'blur(1.5px)'
  },
  beforeLeave: function () {
    document.querySelector('#app').style.filter = ''
  }
})

export default effectRegister
export { effectStack, effectRegister }
