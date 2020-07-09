'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production';

const name = defaultSettings.title || '博客-后台管理系统' // page title

// cdn 配置
const cdn = {
  css: [
    'https://unpkg.com/element-ui@2.3.7/lib/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js',
    'https://unpkg.com/vue-router@3.0.2/dist/vue-router.min.js',
    'https://unpkg.com/vuex@3.1.0/dist/vuex.min.js',
    'https://unpkg.com/element-ui@2.3.7/lib/index.js'
  ]
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9000 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/': {
        target: 'http://62.234.90.11:3300',
        // target: 'http://localhost:3300',
        ws: false,
        changeOrigin: true
        // pathRewrite: {
        //   '^/dev/api/mxc/admin/': '/api/mxc/admin/'
        // }
      }
    }
    // before: require('./mock/mock-server.js')
  },
  chainWebpack(config) {
    config.name = name
    if (isProduction) {
      config.externals = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT'
      }
    }
  }
}
