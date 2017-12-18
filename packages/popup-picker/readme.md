
## vc-popup-picker

-----

一个基于popup-base的picker, 优化于we-vue/mint-ui的picker

### 添加依赖

```shell
> yarn add vc-popup-picker || npm i vc-popup-picker || cnpm i vc-popup-picker --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupPicker from 'vc-popup-picker'
// 这里名字可以随意

Vue.use(VcPopupPicker)
```

### 在具体页面中使用

```javascript
this.vcPopupPicker = new this.$popup.VcPopupPicker({
  ...config
  propsData: {}
})

// e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
// config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

this.vcPopupPicker.open(e, {
  ...config
  propsData: {}
})

this.vcPopupPicker.close()
```

### propsData配置定义

```json
{
  e: Object // 从open(e, {})传进来的e
  
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-picker.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
