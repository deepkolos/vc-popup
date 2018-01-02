var fs = require('fs')
var path = require('path')
var readlineSync = require('readline-sync');
var deleteFolderRecursive = require('./utils').deleteFolderRecursive;
require('shelljs/global');

// 工具函数
function _path(str){
  return path.resolve(__dirname, str)
}

function _package(name){
  return `{
  "name": "vc-${name}",
  "version": "0.0.0",
  "description": "vc-${name}",
  "main": "index.js",
  "scripts": {
    "test": "echo hasn't write test~"
  },
  "author": "deepkolos",
  "license": "MIT",
  "dependencies": {}
}`;
}

function initpkg(dirname){
  var path = _path('../packages/'+dirname);
  if ( !fs.existsSync(path) ){
    fs.mkdirSync(path);
    fs.writeFileSync(path+'/package.json', _package(dirname));
  }
}

// 开始

var deleteAllDir = readlineSync.question('是否清空packages下所有目录? (y/n)');

var componentsDir = fs.readdirSync(
  _path('../src/components'), {
    encoding: "utf8"
  });

deleteAllDir.toLowerCase() == 'y' && 
componentsDir.map((dirname) => {
  deleteFolderRecursive(_path('../packages/'+dirname))
})

componentsDir.map(dirname => {
  if (dirname.indexOf('popup-') === 0)
    initpkg(dirname)
});
