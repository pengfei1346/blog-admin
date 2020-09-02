import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/article'
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    meta: { title: '文章管理', icon: 'example' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/article/list'),
        meta: { title: '全部文章', icon: 'form' }
      },
      {
        path: 'addNote',
        component: () => import('@/views/article/addNote'),
        meta: { title: '添加文章', icon: 'tree' }
      },
      {
        path: 'modifyNote',
        hidden: true,
        component: () => import('@/views/article/modifyNote'),
        meta: { title: '修改文章', icon: 'tree' }
      }
    ]
  },

  {
    path: '/categories',
    component: Layout,
    redirect: '/categories/list',
    name: 'Example',
    meta: { title: '分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/categories/list'),
        meta: { title: '全部分类', icon: 'table' }
      },
      {
        path: 'add',
        component: () => import('@/views/categories/add'),
        meta: { title: '添加分类', icon: 'tree' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    redirect: '/tag/index',
    meta: { title: '管理员用户', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/tag/list'),
        meta: { title: '管理员列表', icon: 'form' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tag/list'),
        meta: { title: '添加管理员', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
