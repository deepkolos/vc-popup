const fs = require('fs')
const utils = require('./utils')
const path = require('path')
const uppercamelcase = require('uppercamelcase')


function p(str){
  return path.resolve(__dirname, str)
}

//readme tpl
function _readme(moduleName){
  moduleName = 'vc-'+moduleName
  var camelcased = uppercamelcase(moduleName)
  var NonePrefix = uppercamelcase(moduleName)
  var nonePrefix = NonePrefix.replace(/^\w{1}/, function(word){
    return word.toLowerCase()
  })

  return `
## ${moduleName}

-----

描述

### 添加依赖

\`\`\`shell
> yarn add ${moduleName} || npm i ${moduleName} || cnpm i ${moduleName} --by=yarn
\`\`\`

### 引入

\`\`\`javascript
import Vue from 'vue'
import ${camelcased} from '${moduleName}'
// 这里名字可以随意

Vue.use(${camelcased})
\`\`\`

### 在具体页面中使用

\`\`\`javascript
this.${nonePrefix} = new this.$popup.${NonePrefix}({
  ...config
  propsData: {}
})

// e为事件Event, 比如click时候取得的evt, 与一些定位方法相关
// config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)

this.${nonePrefix}.open(e, {
  ...config
  propsData: {}
})

this.${nonePrefix}.close()
\`\`\`

### propsData配置定义

\`\`\`json
{
  e: Object // 从open(e, {})传进来的e
  
}
\`\`\`

### 效果预览

<div>
  <img src="https://raw.githubusercontent.com/deepkolos/vc-popup/master/static/${moduleName}.gif" width = "250" alt="" style="display:inline-block;"/>
</div>

### License

MIT 一起来扣细节~
`
}

// 开始

utils.mapPkgList(function(dirname){

  fs.writeFileSync(p('../packages/'+dirname+'/readme.md'), _readme(dirname))
})