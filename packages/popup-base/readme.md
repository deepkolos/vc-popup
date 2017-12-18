
## vc-popup-base

-----

作为popup的基础件, 提供各种popup层面相关的设置, 比如mask, 子popup的定位支持, clickRelative, domRelative, center,等

### 添加依赖

```shell
> yarn add vc-popup-base || npm i vc-popup-base || cnpm i vc-popup-base --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupBase from 'vc-popup-base'
// 这里名字可以随意

Vue.use(VcPopupBase)
```

### 在具体页面中使用

```javascript
this.vcPopupBase = new this.$popup.VcPopupBase({
  ...config
  propsData: {}
})

// e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
// config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

this.vcPopupBase.open(e, {
  ...config
  propsData: {}
})

this.vcPopupBase.close()
```

### propsData配置定义

```json
{
  e: Object // 从open(e, {})传进来的e
  
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-base.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
