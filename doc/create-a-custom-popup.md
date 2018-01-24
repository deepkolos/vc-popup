
## 在已有的项目里,自定义popup

拿`vc-popup`的`example`举例, 其目录结构如下, 在`components`下来编写自定义的popup组件
这里拿`popup-custom`作为样例


```shell
.\example
├───assets
├───components
│   └───popup-custom
│       └───index.js
│       └───popup-custom.vue
├───pages
└───router
```

#### /components/popup-custom/**index.js**

```javascript
// 根据情况修改template的路径
import template from './popup-custom.vue'
import { popupRegister } from 'vc-popup-base'
// 需要手动安装一下npm i vc-popup-base依赖

var popUpConfig = {
}

var defaultConfig = {  // 可以在运行是覆盖, 一般在运行时定义灵活度高
  autoSetOrthocenter: true,
  position: 'domRelative'
}

export default popupRegister(
  'Custom', // 自动首字母大写, 名字会覆盖已注册的, 会挂载到Vue.prototype.popup[name]里
  template,
  popUpConfig,
  defaultConfig)
```
#### /components/popup-custom/**popup-custom.vue**

这个和vue单文件的结构一样, 但是多了一些可以配置的地方:

0. 主要是提供了`popup`事件钩子, 一共5个, 可以通过这些事件可以定制更多的过度动画
1. 还提供了一个接受触发`popup`事件的`e`, 从`open()`里传进来的

```javascript
<template>
  <div></div>
</template>

<script>
  export default {
    props: {
      e: {
        default: null           // 从open()传进来的
      }
    },

    created () {
      this.event = {            // 执行顺序如下
        beforeEnter:  () => {}, // 在appendChild前一帧执行
        afterDomLoad: () => {}, // 在appenChild那一帧执行, 定位需要使用到getBoundingClientRect的话就挂在这里
        afterEnter:   () => {}, // 进入动画结束时执行
        beforeLeave:  () => {}, // 触发离开事件时执行
        afterLeave:   () => {}, // 离开动画结束时执行
      }
    }
  }
</script>
```
### 最后在页面中使用

然后需要使用的时候`import`这个组件进去就可以了, 可以单独的页面引用, 也可以在项目全局`import`, 名字可自定义

```JavaScript
<template>
  <div class="page">
    <div class="btn" ref="btn" @click="click">custom popover</div>
  </div>
</template>

<script>
  // popupCustom名字可以根据含义更改
  import '../components/popup-custom'

  export default {
    mounted () {
      // 这里需要注意,this.$refs在mounted后才会初始化, 请不要在created时候使用
      this.popupCustom = new this.$popup.Custom({
        refDom: this.$refs.btn,
        refCorner: 'top right',
        relativeToCorner: 'above before',
        propsData: {
          items: [
            {
              name: '自定义的popup',
              click: e => {console.log('btn0 clicked');},
              src: 'https://gw.alipayobjects.com/zos/rmsportal/tOtXhkIWzwotgGSeptou.svg'
            },{
              name: '二维码',
              click: e => {this.popupCustom.close(e)},
              src: 'https://gw.alipayobjects.com/zos/rmsportal/PKAgAqZWJVNwKsAJSmXd.svg'
            }
          ]
        }
      })
    },

    methods: {
      click (e){
        this.popupCustom.open(e);
      }
    }
  }
</script>
```
