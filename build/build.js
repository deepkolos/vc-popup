'use strict'
require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const fs = require('fs')
const deleteFolderRecursive = require('./utils').deleteFolderRecursive
var webpackConfig

function p(str){
  return path.resolve(__dirname, str)
}

switch (process.env.NODE_ENV){
  case 'production':
    webpackConfig = require('./webpack.prod.conf')
  break;
  case 'module':
    webpackConfig = require('./webpack.module.conf')
  break;
  case 'packages':
    webpackConfig = require('./webpack.pkg.conf')
  break;
}

const spinner = ora('building for '+ process.env.NODE_ENV +'...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    //更新在node_modules的依赖vc-popup-base
    if (process.env.NODE_ENV === 'pkg'){
      let base = p('../node_modules/vc-popup-base')

      fs.existsSync(base) == false && fs.mkdirSync(base)

      let files = fs.readdirSync(p('../packages/popup-base'))

      files.forEach(function(filename){
        fs.copyFileSync(
          p('../packages/popup-base/'+filename),
          p('../node_modules/vc-popup-base/'+filename)
        )
      })

      // 压缩就不做, 看到didi的后编译, 其实的确是重复了
    }
  })
})