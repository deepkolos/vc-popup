'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
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
  ]
})

webpackConfig.entry = {
  'popup-base': path.resolve(__dirname, `../packages/popup-base/install.js`)
}

webpackConfig.output = {
  path: path.resolve(__dirname, '../packages/'),
  filename: `[name]/index.js`,
  libraryExport: "default",
  libraryTarget: "umd"
}

module.exports = webpackConfig
