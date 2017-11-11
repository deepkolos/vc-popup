# vc-popup [Demo](https://deepkolos.github.io/vc-popup/)

[![Build Status](https://travis-ci.org/deepkolos/vc-popup.svg?branch=master)](https://travis-ci.org/deepkolos/vc-popup)

> popup components 

#特点

> 0. 支持返回键, 可以按浏览器返回按钮关闭popup
> 1. 可以支持写出小复杂的过度动画, 比如磁贴按压效果[在popUpMenu可看到~]
> 2. 提供了几个比较好的popup组件, calendar, picker, imgViewer
> 3. 行为定义相对标准, 这一点比较重要的, 前端行为定义犹如算法的输入定义一样, 比如触发关闭之后, 结束动画未结束之前, popup会拦截所有的输入事件, popup属于不可交互状态
> 4. 拓展也比较方便~

## 预览

![](https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-calendar.gif)

![](https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-picker.gif)

![](https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/popup-img-viewer.gif)

## 安装

``` bash
# install dependencies
npm install || cnpm i

# serve with hot reload at localhost:8080, 正常
npm run dev

# build for production with minification, 正常
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests, 有问题
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
