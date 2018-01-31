## this.$popupCtrl的API说明

### 概览

```js
this.$popupCtrl = {
  config,         // defaultConfig, constructConfig(new时候), runtimeConfig(open时候)所合并出来的config
  vmBase,         // vc-popup-base的vm引用
  vmSlot,         // vc-popup-slot的vm引用
  close(),        // 关闭popup
  getRouterId(),  // 获取hash的id
  parseRefCorner(String),       // 纯函数, 提供refCorner的参数解析
  parseRelativeToCorner(String) // 纯函数, 提供relativeToCorner的参数解析
}

vmBase = {
  vmSlot,
  addMaskClass(String),
  removeMaskClass(String),
  trunOnMaskTransition(viod),
  trunOffMaskTransition(viod),
  setMaskOpacity(Number),
  setAnimateDom(Dom),
  getAnimateDom()
}

vmSlot = {
  $popupCtrl
}

config = {
  e,
  propsData,
  ...
}
```

##### vmBase和vmSlot例子

<img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/$popupCtrl's api-0.png" alt="" style="display:inline-block;"/>
