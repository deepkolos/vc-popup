
## vc-popup-effect-tile-press

-----

wp的磁贴按压效果

### 添加依赖

```shell
> yarn add vc-popup-effect-tile-press || npm i vc-popup-effect-tile-press || cnpm i vc-popup-effect-tile-press --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import tilePress from 'vc-popup-effect-tile-press'
// 这里名字可以随意

Vue.use(tilePress)
```

### 在具体页面中使用

```javascript
this.centerMenu = new this.$popup.CenterMenu({
  animation: {
    in: { effect: 'tilePress' },
    out: { effect: 'tilePress' }
  }
})
```

> e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
> config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-tile-press.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
