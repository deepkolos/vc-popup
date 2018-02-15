# 定制可复用的过渡动画

```js
import { effectRegister } from 'vc-popup-base'

var doSomething = function (cfg, vmBase) {}

effectRegister('effectName', {
  beforeMount: doSomething,
  afterMount:  doSomething,
  beforeLeave: doSomething,
  afterLeane:  doSomething,
  beforeLeave: doSomething,
  afterLeave:  doSomething
})
```

比如简单的bodyBlur实现就是

```js
effectRegister('bodyBlur', {
  beforeEnter: function () {
    document.querySelector('#app').style.filter = 'blur(1.5px)'
  },
  beforeLeave: function () {
    document.querySelector('#app').style.filter = ''
  }
})
```