
## vc-popup-base

-----

提供popup的基础支持

### 添加依赖

```shell
> yarn add vc-popup-base || npm i vc-popup-base || cnpm i vc-popup-base --by=yarn
```

### 使用

```javascript
// 根据情况修改template的路径
import template from './popup-custom.vue'
import { popupRegister } from 'vc-popup-base'
// 需要手动安装一下npm i vc-popup-base依赖

var popupConfig = {
}

var defaultConfig = {  // 可以在运行是覆盖, 一般在运行时定义灵活度高
  autoSetOrthocenter: true,
  position: 'domRelative'
}

export default popupRegister(
  'Custom', // 自动首字母大写, 名字会覆盖已注册的, 会挂载到Vue.prototype.popup[name]里
  template,
  popupConfig,
  defaultConfig)
```

使用vc-popup-base[自定义一个popup](https://github.com/deepkolos/vc-popup/blob/master/doc/create-a-custom-popup.md)

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/vc-popup-base.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
