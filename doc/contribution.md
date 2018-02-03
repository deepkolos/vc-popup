## 改造

```shell
# 安装依赖
> yarn || cnpm i --by=npm || npm install

# 开发
> npm run dev

# 生成example
> npm run build

# 生成packages
> npm run packages

# 生成单独生成popup-base, 样例代码是依赖vc-popup-base的库, 可以通过此命令来更新
> npm run base

# 生成packages的install.js, 编译出pkg的index.js
> npm run build:pkgentry

# 生成vc-popup的lib/vc-popup.js和vc-popup.min.js
> npm run module

```