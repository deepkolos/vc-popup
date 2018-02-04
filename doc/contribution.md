## 改造

```shell
# 安装依赖
> yarn || cnpm i --by=npm || npm install

# 开发
> yarn dev

# 生成example
> yarn build

# 生成单独生成popup-base, 样例代码是依赖vc-popup-base的库, 可以通过此命令来更新
> yarn base

# 生成packages
> yarn packages

# 生成vc-popup的lib/vc-popup.js和vc-popup.min.js
> yarn module

# 生成packages的install.js, 编译出pkg的index.js
> yarn build:pkgentry

```