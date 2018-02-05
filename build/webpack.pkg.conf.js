'use strict'
const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const MinifyPlugin      = require("babel-minify-webpack-plugin");

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: false
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  externals: ['vue', 'vc-popup-base', 'vue-router'],
  plugins: [
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // new MinifyPlugin(),
  ]
})

fs.readdirSync(path.resolve(__dirname, '../packages'));

webpackConfig.entry = {}
webpackConfig.output = {
  path: path.resolve(__dirname, '../packages/'),
  filename: `[name]/index.js`,
  libraryExport: "default",
  libraryTarget: "umd"
}

utils.mapPkgList(function(popupName){
  webpackConfig.entry[popupName] =
    path.resolve(__dirname, `../packages/${popupName}/install.js`)
})

module.exports = webpackConfig
