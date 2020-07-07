import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

//  导入请求框架
import api from './api'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

//引入全局过滤器
import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//  使用api
Vue.use(api)

Vue.config.productionTip = false

// import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'

// Vue.use(Message) // will mount `Vue.prototype.$message`

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
