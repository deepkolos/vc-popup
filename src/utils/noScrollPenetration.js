/** 说明
 * 0. 仅仅支持移动端
 * 1. 仅仅支持纵向方向
 * 2. 仅仅支持一根手指, 未适配多根手指scroll的情况
*/

const directive = {
  bind: function ($el, binding) {
    // 定义
    var lastMoveY
    var registerEnd = 0
    var registerStart = 0

    function init () {
      if ($el.scrollTop === 0)
        registerStart++

      $el.addEventListener('touchmove', move)
      $el.addEventListener('touchstart', start)
    }

    function start (evt) {
      var scrollTop = $el.scrollTop
      var scrollHeight = $el.scrollHeight
      var clientHeight = getClientHeight($el)

      lastMoveY     = evt.touches[0].clientY
      registerEnd   = registerEnd   > 1 ? 1 : 0
      registerStart = registerStart > 1 ? 1 : 0
      registerEnd   = Number((scrollHeight - clientHeight) - scrollTop <= 1)
      registerStart = Number(scrollTop - 0 <= 1)
    }

    function move (evt) {
      var scrollTop = $el.scrollTop
      var moveY = evt.touches[0].clientY
      var scrollHeight = $el.scrollHeight
      var clientHeight = getClientHeight($el)
      var offsetY = moveY - lastMoveY

      console.log(offsetY)
      if (offsetY < 0) {
        // 往上,检查下界
        registerStart = 0
        registerEnd = scrollHeight - clientHeight - scrollTop <= 1
                      ? registerEnd + 1
                      : 0
      } else {
        // 往下,检查上界
        registerEnd = 0
        registerStart = scrollTop - 0 <= 1
                      ? registerStart + 1
                      : 0
      }

      if (registerStart > 1 || registerEnd > 1) {
        evt.preventDefault()
        console.log('noPenetarion', registerStart, registerEnd)
        $el.scrollTop = scrollTop - 0.1
      }

      lastMoveY = moveY
    }

    // 初始化
    init()
  }
}

function getClientHeight ($el) {
  return Math.floor($el.getBoundingClientRect().height)
}

export default directive
