
## vc-popup-picker

-----

从we-vue优化的picker, 其参考mint-ui, 所以算是从mint-ui的pick吧~ 改造成支持返回键的picker~

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
this.picker = new this.$popup.Picker({
  ...config
  propsData: {}
})

this.picker.open(e, {
  ...config
  propsData: {}
})

this.picker.close()
```

> e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
> config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

### propsData配置定义

```js
{
  e: Object // 从open(e, {})传进来的e
  slots: Array,
  onChange: Function,
  showItemNum: Number,
  defaultValues: Array,
  showItemHeight: Number,

  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  onConfirm: Function,
  onCancel:  Function
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-picker.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
