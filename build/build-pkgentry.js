var fs = require('fs')
var render = require('json-templater/string')
var path = require('path')
var utils = require('./utils')

var p = function (str){
  return path.resolve(__dirname, str);
}
var PACKAGE_PATH = p('../packages')
var DEPENDANCE_TEMPLATE = `  Vue.use(require('{{name}}'))`
var MAIN_TEMPLATE = `
const version = '{{version}}'
const install = function (Vue, config = {}) {
  if (install.installed) return
{{includeDepend}}
  require('{{self}}')
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version
}
`
var BASE_MAIN_TEMPLATE = `
import { popupRegister } from '{{self}}'

const version = '{{version}}'
const install = function (Vue, config = {}) {
  if (install.installed) return
{{includeDepend}}
  require('{{self}}')
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  popupRegister
}
`

function build_install(popupName){
  var pkg = require(`${PACKAGE_PATH}/${popupName}/package.json`)
  var version = pkg.version
  var dependanceList = []
  var tpl = popupName === 'popup-base'? BASE_MAIN_TEMPLATE: MAIN_TEMPLATE

  pkg.dependencies &&
  Object.keys(pkg.dependencies).forEach(function(depName){
    dependanceList.push(render(DEPENDANCE_TEMPLATE, {
      name: depName
    }))
  });

  var template = render(tpl, {
    includeDepend: dependanceList.join('\n'),
    version: version,
    self: `../../src/components/${popupName}`
  })
  

  fs.writeFileSync(p(`../packages/${popupName}/install.js`), template);
  // 后面估计需要使用一些走异步加快构建速度了
}

// 开始
utils.mapPkgList(function(popupName){
  build_install(popupName)
})
