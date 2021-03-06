var Components = require('../components.json')
var fs = require('fs')
var render = require('json-templater/string')
var uppercamelcase = require('uppercamelcase')
var path = require('path')

var OUTPUT_PATH = path.join(__dirname, '../src/index.js')
var IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/install\''
var ISNTALL_COMPONENT_TEMPLATE = '  Vue.use({{name}})'
var MAIN_TEMPLATE = `{{include}}

const version = '{{version}}'
const install = function (Vue, config = {}) {
  if (install.installed) return
{{install}}
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

var ComponentNames = Object.keys(Components)

var includeComponentTemplate = []
var installTemplate = []
var listTemplate = []

ComponentNames.forEach(name => {
  var componentName = uppercamelcase(name)

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }))

  installTemplate.push(render(ISNTALL_COMPONENT_TEMPLATE, {
    name: componentName,
    component: name
  }))

  listTemplate.push(`  ${componentName}`)
})

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join('\n'),
  install: installTemplate.join('\n'),
  version: process.env.VERSION || require('../package.json').version,
  list: listTemplate.join(',\n')
})

fs.writeFileSync(OUTPUT_PATH, template)
console.log('[build entry] DONE:', OUTPUT_PATH)
