
## vc-popup-press-menu

-----

模仿微信的长按菜单~

### 添加依赖

```shell
> yarn add vc-popup-press-menu || npm i vc-popup-press-menu || cnpm i vc-popup-press-menu --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupPressMenu from 'vc-popup-press-menu'
// 这里名字可以随意

Vue.use(VcPopupPressMenu)
```

### 在具体页面中使用

```javascript
this.pressMenu = new this.$popup.PressMenu({
  ...config
  propsData: {}
})

this.pressMenu.open(e, {
  ...config
  propsData: {}
})

this.pressMenu.close()
```

> e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
> config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

### propsData配置定义

```js
{
  e: Object // 从open(e, {})传进来的e
  items: {
    type: Array,
    required: true,
    example: [
      {
        name:  String,
        click: Function,
      },
      {
        name: '分享二维码',
        click: () => console.log('btn0 clicked')
      },
      ...
    ]
  },
  onClose: Function,
  onOpen: Function
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-press-menu.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
