# vc-popup [Demo](https://deepkolos.github.io/vc-popup/)

一个行为标准的vue-popup组件集

[![Build Status](https://travis-ci.org/deepkolos/vc-popup.svg?branch=master)](https://travis-ci.org/deepkolos/vc-popup)

# 特点

> 0. 支持`返回键`, 可以按浏览器返回按钮关闭popup
> 0. 支持popup的层叠显示
> 1. 可以写出小复杂的`过度动画`, 比如磁贴按压效果[在popUpMenu可看到~]
> 2. 支持css动画库, 比如animation.css, 使用的时候自行添加依赖就好了
> 3. 提供了几个比较好的popup组件, calendar, picker, imgViewer
> 4. `行为定义相对标准`, 这一点比较重要的, 前端行为定义犹如算法的输入定义一样, 比如触发关闭之后, 结束动画未结束之前, popup会拦截输入事件, popup属于`不可交互状态`
> 5. 可方便进行拓展~
> 6. 差点忘说了, 强大的**定位支持**, 有`居中`, `clickRelative`, `domRelative`, 其中`domRelative` 支持25个位置
> 7. `Layer`都经过优化了, 层次合理~, 没有出现压缩层, 或者层爆炸的情况~
> 8. 采用的是`绝对的置顶策略`, 就是即便在页面内设置`fixed`+`z-index:99999999999;`, 都不会遮盖弹出的`popup`~

> `注:` 因为这是之前给一个[组件库贡献的](https://github.com/tianyong90/we-vue/pull/17), 现在把`popup系列`提取出来, ~~部分组件从那个组件库中拿来, 比如example用到的~~`cell`, `group`, `buttom`,(现在已经移除依赖~), 其中`picker-view`是我优化过的, 其余都是`自己写哒`~ 


## 预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/domRelative-25-location.png" width = "250" alt="" style="display:inline-block;"/>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-position.gif" width = "250" alt="" style="display:inline-block;"/>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-calendar.gif" width = "250" alt="" style="display:inline-block;"/>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-picker.gif" width = "250" alt="" style="display:inline-block;"/>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-img-viewer.gif" width = "250" alt="" style="display:inline-block;"/>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-img-viewer-slow.gif" width = "250" alt="" style="display:inline-block;"/>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-tile-press.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

## 使用(未完善),最近都在改构建, 未稳定

注: 需要配合webpack来使用, 不支持jq那种方式

```shell
yarn add vc-popup
```

在入口`main.js`导入依赖, 除此之外,现在[可以单独组件使用了~](https://www.npmjs.com/~deepkolos)

```javascript
...
import Vue from 'vue'
import PopUp from 'vc-popup'

Vue.use(PopUp)
...
```

在页面中使用:

```javascript
<template>
  <div class="page">
    <div class="btn" @click="click">show popup</div>
  </div>
</template>

<script>

  export default {
    mounted () {
      // 这里需要注意,this.$refs在mounted后才会初始化, 请不要在created时候使用
      this.Popover = new this.$popup.Popover({
        ...config
        propsData: {}
      })
    },

    methods: {
      click (e){
        this.Popover.open(e, {
          ...config
          propsData: {}
        });
      }
    }
  }
</script>
```

### 配置参数
```
{
  // 在hash当中的名字, 如果为undefined的话,那么将会采用`popup's name_num`
  // 自定义的时候, 则需要人工保证唯一, 不然返回就检查不出来了
  name: String/Undefined, 

  // 定位的类型, 默认absolute, 将会全局的锁定
  positionType: "absolute/fixed", 
  // 设置定位方式, 在popup的vue的style也可以定位, 不会与之冲突, 最终结果是二者的叠加
  position: "clickRelative/domRelative/center",

  // 相对于视窗的各边的距离, 支持负数,百分比
  // 如果top,buttom同时为undefined, 设置为居中
  position: {
    top: Number/Undefined,
    buttom: Number/Undefined,
    left: Number/Undefined,
    right: Number/Undefined
  },

  //// clickRelative的相关 \\\\

  // 弹出的popup在此区域之内
  frame: {
    top: Number,
    buttom: Number,
    left: Number,
    right: Number
  },
  frame: HTMLElement,

  // 弹出的popup距离区域边框的边距
  // 支持百分比, 百分比相对于区域对应轴
  // 比如margin: 10%, 结果是, 左/右: 10%区域宽, 上/下: 10%区域高
  margin: Number/String,                     // 设置4个边一样
  margin: [Number, Number],                  // 分别设置x,y轴
  margin: [Number, Number, Number, Number],  // 分别设置4边


  //// domRelative的相关 \\\\

  // 设置参考Dom节点
  refDom: HTMLElement,
  // 设置参考点, 参考dom节点的方位
  refCorner: "top/bottom/center left/right/center",
  // 设置相对于参考点的方位
  relativeToCorner: "above/below before/after",

  //// 动画设置 \\\\

  // 根据position的位置设置transform-origin
  autoSetOrthocenter: true,

  // 设置动画的进出动画, 会和popup的vue里面通过提供的事件钩子实现的过度动画冲突
  // 在自定义popup的时候需要注意一下
  // 支持animation.css等动画库, 使用的时候自行添加依赖就好了
  animation: {
    in: ["animated", "flipInX"],
    out: ["animated", "flipOutX"]

    in: {
      effect: "zoomFromDom"
    },
    out: {
      effect: "zoomFromDom"
    }
  }
}
```

popup的具体使用, 可以先看看代码, 参数都比较简单, 晚点更新这部分文档

[在已有项目中自定义一个popup.md](https://github.com/deepkolos/vc-popup/blob/master/doc/create-a-custom-popup.md)

[更新日志.md](https://github.com/deepkolos/vc-popup/blob/master/doc/update-log.md)

[自定义改造.md](https://github.com/deepkolos/vc-popup/blob/master/doc/contribution.md)


## License

MIT 一起来扣细节~