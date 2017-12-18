
## vc-popup-by-animation

-----

描述

### 添加依赖

```shell
> yarn add vc-popup-by-animation || npm i vc-popup-by-animation || cnpm i vc-popup-by-animation --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupByAnimation from 'vc-popup-by-animation'
// 这里名字可以随意

Vue.use(VcPopupByAnimation)
```

### 在具体页面中使用

```javascript
this.vcPopupByAnimation = new this.$popup.VcPopupByAnimation({
  ...config
  propsData: {}
})

// e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
// config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

this.vcPopupByAnimation.open(e, {
  ...config
  propsData: {}
})

this.vcPopupByAnimation.close()
```

### propsData配置定义

```json
{
  e: Object // 从open(e, {})传进来的e
  
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-by-animation.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
