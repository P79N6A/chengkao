'use strict'
const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env.js'),
    index: path.resolve(__dirname, '../../build/index.html'),
    assetsRoot: path.resolve(__dirname, '../../build'),
    assetsSubDirectory: './',
    assetsPublicPath: '',
    productionSourceMap: false,
    productionGzip: false,
    linkCss: false,
    vendor: false,
    buildHtml: true,
    productionGzipExtensions: ['js', 'css'],
  },
  dev: {
    env: require('./dev.env.js'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
