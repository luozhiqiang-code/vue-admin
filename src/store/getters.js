import { MAIN_COLOR } from '@/constant'
import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'

// 快捷访问方法
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  /**
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}' // 如果用户信息不为空对象，说明已经获取到了用户信息
  },
  cssVar: state => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
}
export default getters
