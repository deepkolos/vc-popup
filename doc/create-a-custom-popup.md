
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
import Vue from 'vue'
import template from './popup-custom.vue'
// 根据情况修改template的路径

var popUpConfig = {}
var defaultConfig = {          // 可以在运行是覆盖, 一般在运行时定义灵活度高
  name: String,
  autoSetOrthocenter: Boolean, // 根据定位设置相应的transform-origin
  position: String,            // 定位类型可以为'clickRelative', 'domRelative', 'center'
  // 还有其他晚点完善
}

// 目前的是会覆盖默认提供的, 如果名字一样的话, 这里需要再考虑考虑
// 优点在于, 如果内置组件有问题了, 需要及时修复, 就可以使用自定义组件替换之, 不过感觉大部分是兼容性问题, 非逻辑问题
export default Vue.prototype.popupRegister(
  'Custom',     // 首字母大写, 名字会覆盖已注册的, 会挂载到Vue.prototype.popup[name]里
  template, 
  popUpConfig, 
  defaultConfig
)
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
  import popupCustom from '../components/popup-custom'
  
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

[详细使用参考.md](https://github.com/deepkolos/vc-popup/blob/master/doc/how-to-use-in-your-project.md)

