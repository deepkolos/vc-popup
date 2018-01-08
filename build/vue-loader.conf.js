'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = -1 !== [
  'module',
  'production',
  'packages'
].indexOf(process.env.NODE_ENV)

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
