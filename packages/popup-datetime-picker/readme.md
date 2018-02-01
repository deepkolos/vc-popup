
## vc-popup-datetime-picker

-----

日期选择器, picker的定制~

### 添加依赖

```shell
> yarn add vc-popup-datetime-picker || npm i vc-popup-datetime-picker || cnpm i vc-popup-datetime-picker --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupDatetimePicker from 'vc-popup-datetime-picker'
// 这里名字可以随意

Vue.use(VcPopupDatetimePicker)
```

### 在具体页面中使用

```javascript
this.datetimePicker = new this.$popup.DatetimePicker({
  ...config
  propsData: {}
})

this.datetimePicker.open(e, {
  ...config
  propsData: {}
})

this.datetimePicker.close()
```

> e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
> config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

### propsData配置定义

```js
{
  e:              Object    // 从open(e, {})传进来的e
  onChange:       Function, // 当选择发生改变的时候触发
  showItemNum:    Number,   // 奇数, 显示一列有多少个行选项, 一般是3,5,7
  defaultValues:  Array,    // 默认值
  showItemHeight: Number,   // 没行的高度

  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  onConfirm: Function,
  onCancel: Function,

  mode: {
    type: String,
    default: 'datetime'
  },
  minDate: {
    type: Date,
    default () {
      var now = new Date()
      now.setFullYear(now.getFullYear() - 10)
      return now
    }
  },
  maxDate: {
    type: Date,
    default () {
      var now = new Date()
      now.setFullYear(now.getFullYear() + 10)
      return now
    }
  },
  use12Hours: {
    type: Boolean,
    default: true
  },
  minuteStep: {
    type: Number,
    default: 1
  },
  showUnit: {
    type: Boolean,
    default: true
  },
  showDivider: {
    type: Boolean,
    default: false
  },

  customUnits: {
    type: Object,
    example: {
      Y: '年',
      M: '月',
      D: '日',
      h: '时',
      m: '分',
      s: '秒',
      am: '上午',
      pm: '下午'
    }
  }
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-picker.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
