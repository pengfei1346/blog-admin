//  导入模块
import * as api_user from './user'
import * as api_article from './article'
import * as api_tag from './tag'
import * as api_categories from './categories'

const apiObj = {
  api_user,
  api_article,
  api_tag,
  api_categories
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //  定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
