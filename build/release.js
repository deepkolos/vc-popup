require('shelljs/global');
var fs = require('fs')
var path = require('path')
var utils = require('./utils')
var readlineSync = require('readline-sync');

function p(str) {
  return path.resolve(__dirname, str)
}

function getVer(path) {
  return JSON.parse(fs.readFileSync(p(path)), 'utf8').version
}

function setVer(path, ver) {
  var path = p(path)
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) throw err
    data = data.replace(
      /"version": "(.*)"/,
      `"version": "${ver}"`
    )
    fs.writeFile(path, data, function (err) {
      if (err) throw err
    })
  })
}

var currPkgVer = getVer('../lerna.json')
var currModuleVer = getVer('../package.json')

var newModuleVer = readlineSync.question(
  `当前module版本为: \t${currModuleVer}\n` +
  `当前packages版本为: \t${currPkgVer}\n` +
  `请输入新module的版本号: `)
var newPkgVer = readlineSync.question(
  `请输入新packages的版本号: `)

// var newPkgVer = '0.1.5'
// var newModuleVer = '1.1.4'

setVer('../lerna.json', newPkgVer)
var packageStr = fs.readFileSync(p('../package.json'), 'utf8')
packageStr = packageStr.replace(
  /"vc-popup-base": "\^(.*)",/,
  `"vc-popup-base": "^${newPkgVer}",`
)
packageStr = packageStr.replace(
  /"version": "(.*)",/,
  `"version": "${newModuleVer}",`
)
fs.writeFileSync(p('../package.json'), packageStr)

utils.mapPkgList(function (subDir) {
  setVer(`../packages/${subDir}/package.json`, newPkgVer)
})

exec(`yarn build:entry && yarn module && yarn packages`)
exec(`git add -A`)
exec(`git commit -m "[release] v${newModuleVer}"`)
// exec(`lerna publish --force-publish *`)
// exec(`npm publish`)