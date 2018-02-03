
## vc-popup-calendar

-----

高仿antd-mobile的calendar组件~ API都差不多的~

### 添加依赖

```shell
> yarn add vc-popup-calendar || npm i vc-popup-calendar || cnpm i vc-popup-calendar --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupCalendar from 'vc-popup-calendar'
// 这里名字可以随意

Vue.use(VcPopupCalendar)
```

### 在具体页面中使用

```javascript
this.calendar = new this.$popup.Calendar({
  ...config
  propsData: {}
})

this.calendar.open(e, {
  ...config
  propsData: {}
})

this.calendar.close()
```

> e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
> config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

### propsData配置定义

```js
{
  e:         Object // 从open(e, {})传进来的e
  onClose:   Function,
  onOpen:    Function,
  onConfirm: Function, // 确认按钮确认时触发
  onConfirmLeaved:      Function, // 退出动画结束之后触发
  onDisableDaySelected: Function,

  // 开启时间部分的选择
  enableTimeSelect: {
    type: Boolean,
    default: false
  },

  // 开启快捷按钮, 今天/昨天/明天 近一周/近一个月
  enableShortcut: {
    type: Boolean,
    default: false
  },

  // 时间段/时间点
  type: {
    type: String,
    default: 'range',
    options: ['range', 'point'],
    example: {
      type: 'range',
      type: 'point',
    }
  },

  // 默认选择时间段/时间点(start开头)
  defaultRange: {
    type: Object,
    example: {
      startY: 2017,
      startM: 10, // 1~12
      startD: 26, // 1~31
      endY: 2017,
      endM: 11,   // 1~12
      endD: 7     // 1~31
    }
  },

  // 大行距
  isLargeRowledge: {
    type: Boolean,
    default: false
  }
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-calendar.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
