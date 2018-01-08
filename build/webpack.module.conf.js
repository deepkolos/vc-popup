'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MinifyPlugin      = require("babel-minify-webpack-plugin");

const webpackConfig = merge(baseWebpackConfig, {
  entry: path.resolve(__dirname, '../src/index.js'),
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'vc-popup.js',
    libraryExport: "default",
    libraryTarget: "umd"
  },
  externals: 'vue',
  plugins: [
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new MinifyPlugin()
  ]
})


module.exports = webpackConfig
