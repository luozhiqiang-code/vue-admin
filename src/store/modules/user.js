import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true, // 表示该模块是单独的模块，不会被合并。类似redux的reducer
  state: () => ({
    // 相当于store中的数据
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    // 相当于actionCreators
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 相当于redux隐射到组件props中的方法

    /**
     * 登录请求的方法
     * @param {*} context
     * @param {*} userInfo
     * @returns
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password) // MD5加密密码，避免明文传输
        })
          .then(data => {
            this.commit('user/setToken', data.token)
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息的方法
     * @param {*} context
     * @returns
     */
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出的方法
     * 1. 清理当前用户缓存数据
     * 2.清理掉权限配置
     * 3.返回登录页
     */
    logout() {
      resetRouter()
      this.commit('user/setToken', '') // 清空store中的token
      this.commit('user/setUserInfo', {}) // 清空用户信息
      this.commit('app/initTagsViewList')
      removeAllItem() // 情况localStorage缓存的数据
      router.push('/login') // 跳转到登录页
    }
  }
}
