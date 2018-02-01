
## vc-popup-dialog

-----

对话框~ 安卓/ios~ 部分代码来自we-vue~

### 添加依赖

```shell
> yarn add vc-popup-dialog || npm i vc-popup-dialog || cnpm i vc-popup-dialog --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupDialog from 'vc-popup-dialog'
// 这里名字可以随意

Vue.use(VcPopupDialog)
```

### 在具体页面中使用

```javascript
this.dialog = new this.$popup.Dialog({
  ...config
  propsData: {}
})

this.dialog.open(e, {
  ...config
  propsData: {}
})

this.dialog.close()
```

> e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
> config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

### propsData配置定义

```js
{
  e: Object // 从open(e, {})传进来的e
  onCancel: Function,
  onComfrim: Function,

  skin: {
    type: String,
    default: 'ios'
    options: ['android', 'ios', 'iosNative', 'lol'],
  },
  title: String,
  message: String,
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  showConfirmBtn: {
    type: Boolean,
    default: true
  },
  showCancelBtn: {
    type: Boolean,
    default: true
  }
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-dialog.gif" width = "250" alt="" style="display:inline-block;"/>
</div>
<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-dialog-lol.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
