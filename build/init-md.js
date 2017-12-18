const fs = require('fs')
const utils = require('./utils')
const path = require('path')
const uppercamelcase = require('uppercamelcase')


function p(str){
  return path.resolve(__dirname, str)
}

//readme tpl
function _readme(moduleName){
  var camelcased = uppercamelcase(moduleName)
  var NonePrefix = uppercamelcase(moduleName.slice(3))
  var nonePrefix = NonePrefix.replace(/^\w{1}/, function(word){
    return word.toLowerCase()
  })

  return `
### ${moduleName}

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

// e为事件Event, 比如click时候取得的evt, 与一些定位方法相关, 可以不是Event
// config可参考[popup-base/readme.md](https://github.com/deepkolos/vc-popup/blob/master/packages/popup-base/readme.md)
this.${nonePrefix}.open(e, {
  ...config
  propsData: {}
})
\`\`\`
`
}




utils.mapPkgList(function(dirname){
  fs.writeFile(p('../packages/vc-'+dirname+'/readme.md'), _readme(dirname))
})