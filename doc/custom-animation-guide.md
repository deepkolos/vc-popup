
# animation设置

如果使用通过**transition**来驱动的话, 则参考如下模版

```js
{
  animation: {
    init: 'vc-slide-up-init',
    in: 'vc-slide-up-in',
    out: 'vc-slide-up-out'
  }
}
```

```css
/* 给init增加优先级*/
.vc-slide-up-in.vc-slide-up-init {
  opacity: 0;
  transform: translateY(100%) translateZ(0);
}

.vc-slide-up-in {
  opacity: 1;
  transform: translateY(0%) translateZ(0);
}

.vc-slide-up-out {
  opacity: 0;
  transform: translateY(100%) translateZ(0);
  transition-duration: 400ms;
}
```

如果使用通过**animation**来驱动的话, 则参考如下模版

```js
{
  animation: {
    in: 'vc-slide-up-in',
    out: 'vc-slide-up-out'
  }
}
```

```css
.vc-slide-up-in {
  animation: animation 280ms ease forwards;
}

.vc-slide-up-out {
  animation: animation 280ms ease reverse;
}

@keyframes animation {
  0%{
    opacity: 0;
    transform: scale(.7)
  }
  70%{
    transform: scale(1.05)
  }
  100%{
    opacity: 1;
    transform: scale(1)
  }
}
```

如果不需要动画则通过如下设置来关闭

```js
{
  animation: {
    in: false,
    out: false
  }
}
```

提供了更复杂的过渡动画自定义编程接口, 更好的动画复用

如下已经内置`zoomFromDom`, `bodyBlur`

```js
{
  animation: {
    in: {
      effect: 'zoomFromDom'
    },
    out: {
      effect: 'zoomFromDom'
    }
  }
}
```

`tilePress`则需要加载依赖, 使用和popup其他是一样的

```js
import Vue from 'vue'
import tilePress from 'vc-popup-effect-tile-press'
// 这里名字可以随意

Vue.use(tilePress)

// 然后设置即可
{
  animation: {
    in: {
      effect: 'tilePress'
    },
    out: {
      effect: 'tilePress'
    }
  }
}
```