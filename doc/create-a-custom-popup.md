
## 在已有的项目里,自定义popup

拿正在vc-popup例子项目举例, 其目录结构如下, 在`components`下来需要自定义的popup组件
这里拿`popup-custom`作为样例


```shell
.\EXAMPLE
├───assets
├───components
│   └───popup-custom
├───pages
└───router
```

#### index.js

```javascript
//根据情况修改template的路径
import template from './popup-custom.vue'
import Vue from 'vue'

var popUpConfig = {}
var defaultConfig = {}

//目前的是会覆盖默认提供的, 如果名字一样的话, 这里需要再考虑考虑
export default Vue.prototype.popupRegister('custom', template, popUpConfig, defaultConfig)
```
#### popup-custom.vue

这个和vue单文件的结构一样, 但是多了一些可以配置的地方:

0. 主要是提供了`popup`生命钩子, 一共5个
1. 还提供了一个接受触发`popup`事件的`e`, 从`open()`里传进来的

```javascript
<template>
  <div>
</template>

<script>
  export default {
    props: {
      e: {
        default: null
      }
    },

    created () {
      this.event = {
        afterDomLoad: () => {},
        beforeEnter: () => {},
        afterEnter: () => {},
        beforeLeave: () => {},
        afterLeave: () => {},
      }
    }
  }
</script>
```
### 最后

然后需要使用的时候`import`这个组件进去就可以了, 可以单独的页面引用, 也可以在项目全局`import`, 名字可自定义

[使用参考.md]()

