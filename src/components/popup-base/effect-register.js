
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
effectRegister('zoomFromDom', function (progress, cfg, unset, vmBase) {
  var $fromDom = cfg.fromDom || (vmBase.e ? vmBase.e.target : null),
    $slot = vmBase.vmSlot.$el,
    fromDomRect, slotRect,

    scaleAdjusted = 2 / 3,
    translateX, translateY,
    fromDomCenterX, fromDomCenterY,
    slotCenterX, slotCenterY

  if (!$fromDom)
    throw new Error('无法找到zoomFromDom的参考dom节点, 请检查设置')

  if ($fromDom && !unset) {
    vmBase._animationNoneReday = true
    $slot.style.opacity = 0
    requestAnimationFrame(() => {
      // 需要挂载到dom里面才能获取到改信息, 所以推迟开始动画
      slotRect = $slot.getBoundingClientRect()
      fromDomRect = $fromDom.getBoundingClientRect()

      if (cfg.offset !== undefined)
        scaleAdjusted = cfg.offset

      slotCenterX = slotRect.left + slotRect.width / 2
      slotCenterY = slotRect.top + slotRect.height / 2
      fromDomCenterX = fromDomRect.left + fromDomRect.width / 2
      fromDomCenterY = fromDomRect.top + fromDomRect.height / 2

      translateX = fromDomCenterX - slotCenterX
      translateY = fromDomCenterY - slotCenterY

      //无论in或者out都是一样的
      $slot.style.opacity = 0
      $slot.style.transform =
        `translate3d(${translateX * scaleAdjusted}px, ${translateY * scaleAdjusted}px,0) scale(${scaleAdjusted})`
      if (progress === 'in') {
        vmBase.$refs.slot.style.transitionDuration = '0ms'

        requestAnimationFrame(() => {
          $slot.style.transform = null
          $slot.style.transitionDuration = null
          vmBase._animationNoneReday = null
          $slot.style.opacity = null
        })
      }
    })
  }
})

/**
 * addClass 方便添加class的工具, 算是一个内置的拓展, 增加onDom的配置
 * value: String | Array
 * onDom: HTMLElemet | String(parse by document.querySelector)
 */
effectRegister('addClass', function (progress, cfg, unset, vmBase) {
  var $dom = vmBase.vmSlot.$el

  if (typeof cfg.onDom === 'string') {
    $dom = document.querySelector(cfg.onDom)
  } else
  if (cfg.onDom instanceof HTMLElement) {
    $dom = cfg.onDom
  }

  if (typeof cfg.value === 'string') {
    if (unset === false)
      $dom.classList.add(cfg.value)
    else
      $dom.classList.remove(cfg.value)
  } else
  if (cfg.value instanceof Array) {
    if (unset === false)
      $dom.classList.add.apply($dom.classList, cfg.value)
    else
      $dom.classList.remove.apply($dom.classList, cfg.value)
  }
})

/**
 * bodyBlur 实现模糊效果, 等同于addClass到#app而已, 这是图个方便
 */
effectRegister('bodyBlur', function (progress, cfg, unset, vmBase) {
  if (progress === 'in' && !unset) {
    document.querySelector('#app').style.filter = 'blur(1.5px)'
  }
  if (progress === 'out' && !unset) {
    document.querySelector('#app').style.filter = ''
  }
})

export default effectRegister
export { effectStack, effectRegister }
