import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from '@/utils/storage' // localStorage的接口

/**
 * 根据登录时间和时间戳判断用户登录是否有效
 */

/**
 * 获取时间戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳 存入localStorage
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export function isCheckTimeout() {
  // 当前时间戳
  var currentTime = Date.now()
  // 缓存时间戳
  var timeStamp = getTimeStamp()
  // 如果当前时间减去缓存时间大于缓存有效期，则缓存失效
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
