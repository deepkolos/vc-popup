
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
│   └───popup-custom.vue
└───router
```

#### /components/popup-custom/**index.js**

```js
// 根据情况修改template的路径
import template from './popup-custom.vue'
import { popupRegister } from 'vc-popup-base'
// 需要手动安装一下npm i vc-popup-base依赖

// API还没稳定
var popupConfig = {
}

// 可以在运行是覆盖, 一般在运行时定义灵活度高
var defaultConfig = {
  position: 'domRelative',
  autoSetOrthocenter: true,
  animationConfigurable: false // 如果, 定制过渡动画则通过改设置, 屏蔽animation设置
  // 最好设置一下默认值, 如果没有在popupEvt实现css3动画的话
  animation: {
    init: 'vc-animation-init',
    in: 'vc-animation-in',
    out: 'vc-animation-out',
  }
}

export default popupRegister(
  'Custom', // 自动首字母大写, 名字会覆盖已注册的, 会挂载到Vue.prototype.$popup[name]里
  template,
  popupConfig,
  defaultConfig
)
```

#### /components/popup-custom/**popup-custom.vue**

这个和vue单文件的结构一样, 但是多了一些可以配置的地方:

0. 主要是提供了`popup`事件钩子, 一共5个, 可以通过这些事件可以定制更多的过渡动画
1. 还提供了一个接受触发`popup`事件的`e`, 从`open()`里传进来的

```vue
<template>
  <div></div>
</template>

<script>
  export default {
    props: {
      e: {
        default: null           // 从open()传进来的
      },
      onClose: Function,        // 已经在base提供了支持
      onOpen: Function
    },

    created () {
      this.popupEvt = {            // 执行顺序如下
        beforeEnter:  () => {}, // 在appendChild前一帧执行
        afterDomLoad: () => {}, // 在appenChild那一帧执行, 定位需要使用到getBoundingClientRect的话就挂在这里
        afterEnter:   () => {}, // 进入动画结束时执行
        beforeLeave:  () => {}, // 触发离开事件时执行
        afterLeave:   () => {}, // 离开动画结束时执行

        inAnimation:  () => {},
        outAnimation: () => {},

        /* inAnimation等效于, outAnimation同理
        beforeEnter (animationConfiged) {
          if (animationConfiged) return

          // animation operation
        }*/

        // 如果需要定制过渡动画, 则在defaultConfig.animationConfigurable = false
        // 然后定制过渡动画则放在beforeEnter/beforeLeave里面
      }

      // 可以通过$popupCtrl, 来获取父级节点的引用和操作
      this.$popupCtrl = {
        config,         // defaultConfig, constructConfig(new时候), runtimeConfig(open时候)所合并出来的config
        vmBase,         // vc-popup-base的vm引用
        vmSlot,         // vc-popup-slot的vm引用
        close(),        // 关闭popup
        getRouterId(),  // 获取hash的id, 注意仅仅当前popup打开的时候, 获取的生效的, 需要关闭后/嵌套时, 注意缓存
        parseRefCorner(String),       // 纯函数, 提供refCorner的参数解析
        parseRelativeToCorner(String) // 纯函数, 提供relativeToCorner的参数解析
      }
    }
  }
</script>
```

this.$popupCtrl的详细API可以查看[this.$popupCtrl's API](https://raw.githubusercontent.com/deepkolos/vc-popup/master/doc/$popupCtrl's api.md)

### 最后在页面中使用

然后需要使用的时候`import`这个组件进去就可以了, 可以单独的页面引用, 也可以在项目全局`import`, 名字可自定义

#### /pages/**popup-custom.vue**

```vue
<template>
  <div class="page">
    <div class="btn" ref="btn" @click="click">custom popover</div>
  </div>
</template>

<script>
  // 如果没有在全局Vue.use(vc-popup系列), 则需要注册一下
  import Vue from 'vue'
  import VcPopupBase from 'vc-popup-base'
  import '../components/popup-custom'
  Vue.use(VcPopupBase)

  // 如果有使用过的话, 则只需要import即可
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

// 自定义popup建议使用scoped
<style scoped>
</style>
```
