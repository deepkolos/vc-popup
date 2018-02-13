## 定制可复用的过渡动画

```js
import { effectRegister } from 'vc-popup-base'

var noop = function (cfg, vmBase) {}

effectRegister('effectName', {
  beforeMount: noop,
  afterMount:  noop,
  beforeLeave: noop,
  afterLeane:  noop,
  beforeLeave: noop,
  afterLeave:  noop
})
```
