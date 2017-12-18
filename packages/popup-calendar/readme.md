
## vc-popup-calendar

-----

描述

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
this.vcPopupCalendar = new this.$popup.VcPopupCalendar({
  ...config
  propsData: {}
})

// e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
// config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

this.vcPopupCalendar.open(e, {
  ...config
  propsData: {}
})

this.vcPopupCalendar.close()
```

### propsData配置定义

```json
{
  e: Object // 从open(e, {})传进来的e
  
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-calendar.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
