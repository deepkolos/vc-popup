const path = require('path')
const fs = require('fs')
const deleteFolderRecursive = require('./utils').deleteFolderRecursive

function p(str){
  return path.resolve(__dirname, str)
}

deleteFolderRecursive(path.resolve(__dirname, '../node_modules/vc-popup-base'))

fs.mkdirSync(p('../node_modules/vc-popup-base'))

var files = fs.readdirSync(p('../packages/popup-base'))

files.forEach(function(filename){
  fs.copyFileSync(
    p('../packages/popup-base/'+filename),
    p('../node_modules/vc-popup-base/'+filename)
  )
})