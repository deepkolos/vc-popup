
## vc-popup-center-menu

-----

模仿微信上下居中弹出菜单~ 增加了类似metro的按压特效~

### 添加依赖

```shell
> yarn add vc-popup-center-menu || npm i vc-popup-center-menu || cnpm i vc-popup-center-menu --by=yarn
```

### 引入

```javascript
import Vue from 'vue'
import VcPopupCenterMenu from 'vc-popup-center-menu'
// 这里名字可以随意

Vue.use(VcPopupCenterMenu)
```

### 在具体页面中使用

```javascript
this.centerMenu = new this.$popup.CenterMenu({
  ...config
  propsData: {}
})

this.centerMenu.open(e, {
  ...config
  propsData: {}
})

this.centerMenu.close()
```

> e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
> config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

### propsData配置定义

```js
{
  e:       Object     // 从open(e, {})传进来的e
  items: {
    type: Array,
    required: true,
    example: [
      {
        name:  String,
        click: Function,
      },
      {
        name: '扫描',
        click: e => console.log('btn0 clicked'),
      },
      ...
    ]
  }
}
```

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-tile-press.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
