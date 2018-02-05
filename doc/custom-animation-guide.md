
# animation设置

如果使用通过**transition**来驱动的话, 则参考如下模版

```js
{
  animation: {
    init: 'vc-init',
    in: 'vc-in',
    out: 'vc-out'
  }
}
```

```css
/* 给init增加优先级*/
.vc-in.vc-init {
  opacity: 0;
  transform: translateY(100%) translateZ(0);
}

.vc-in {
  opacity: 1;
  transform: translateY(0%) translateZ(0);
}

.vc-out {
  opacity: 0;
  transform: translateY(100%) translateZ(0);
  transition-duration: 400ms;
}
```

如果使用通过**animation**来驱动的话, 则参考如下模版

```js
{
  animation: {
    in: 'vc-in',
    out: 'vc-out'
  }
}
```

```css
.vc-in {
  animation: animation 280ms ease forwards;
}

.vc-out {
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