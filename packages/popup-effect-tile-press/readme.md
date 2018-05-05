
## vc-popup-effect-fold

-----

wp的磁贴按压效果

### 添加依赖

```shell
> yarn add vc-popup-effect-fold || npm i vc-popup-effect-fold || cnpm i vc-popup-effect-fold --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import tilePress from 'vc-popup-effect-fold'
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

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-tile-press.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
