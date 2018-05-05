
## vc-popup-effect-fold-zoom

-----

dialog effect的henry特效, 移植于[https://tympanus.net/Development/DialogEffects/henry.html](https://tympanus.net/Development/DialogEffects/henry.html)

### 添加依赖

```shell
> yarn add vc-popup-effect-fold-zoom || npm i vc-popup-effect-fold-zoom || cnpm i vc-popup-effect-fold-zoom --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import foldZoom from 'vc-popup-effect-fold-zoom'
// 这里名字可以随意

Vue.use(foldZoom)
```

### 在具体页面中使用

```javascript
this.centerMenu = new this.$popup.CenterMenu({
  animation: {
    in: { effect: 'foldZoom' },
    out: { effect: 'foldZoom' }
  }
})
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-fold-zoom.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
