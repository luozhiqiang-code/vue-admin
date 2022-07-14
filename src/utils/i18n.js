import { watch } from 'vue' // 监听数据的变化
import store from '@/store'
import i18n from '@/i18n'
// 根据动态菜单的title，从语言包里面选择对应的语言版本，作为放入菜单的title来实现语言切换
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

/**
 * 监听语言的变化，执行回调
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb(store.getters.language))
    }
  )
}
