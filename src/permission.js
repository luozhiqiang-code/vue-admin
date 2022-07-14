import router from './router'
import store from './store'

// 白名单 即使没有权限也能进入的页面
const whiteList = ['/login']
/**
 * 路由前置守卫
 * to 到哪里去
 * from 从哪里来
 * next 是否要去
 */

router.beforeEach(async (to, from, next) => {
  // 1. 用户登录，则不允许再进入login
  // 2. 用户未登录，则允许进入login
  // 存在 token ，进入主页

  // if (store.state.user.token) {
  // 快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的权限

        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 没有token的情况下，只有白名单中的页面可以进入
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      // 进入别的页面，则跳转到登录页
      next('/login')
    }
  }
})
