import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import layout from '@/layout'
import UserManageRouter from './modules/UserManage'
import RoleListRouter from './modules/RoleList'
import PermissionListRouter from './modules/PermissionList'
import ArticleRouter from './modules/Article'
import ArticleCreaterRouter from './modules/ArticleCreate'
import store from '@/store'

/**
 * 私有路由表  需要访问权限才能访问
 */
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter
]

/**
 * 公开路由表 不需要权限就能访问
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/profile', // 默认展示页面
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/profile/index'),
        // 根据路由权限传递数据，展示权限对应的菜单
        meta: {
          title: 'profile',
          icon: 'personnel'
        }
      },
      // 404 not found 页面
      {
        path: '/404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "error-page" */ '@/views/error-page/404')
      },
      // 401 未验证页面
      {
        path: '/401',
        name: '401',
        component: () =>
          import(/* webpackChunkName: "error-page" */ '@/views/error-page/401')
      }
    ]
  }
]

/**
 * 初始化路由表 每次获取新的路由表前把上一次的路由表清空，否则权限为保持上一次的不变
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach(menu => {
      router.removeRoute(menu)
    })
  }
}

/**
 * 合并路由表
 */
const router = createRouter({
  history:
    process.env.NODE_ENV === 'production'
      ? createWebHistory()
      : createWebHashHistory(),
  routes: publicRoutes
})

export default router
