import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'

/**
 * axios 封装
 */
// 根据不同的模式，请求不同的baseURL
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器 拦截请求，做一下操作，比如设置响应头的字段等
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      if (isCheckTimeout()) {
        // 检查token是否失效
        // 登出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置 icode
    config.headers.icode = 'B9292E99276D75B4'
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 在收到响应后拦截数据，对数据做一些处理
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data // 请求成功，返回数据
    } else {
      // 业务错误
      ElMessage.error(message) // 在element提示组件中提示错误消息
      return Promise.reject(new Error(message)) // 抛出错误
    }
  },
  error => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
