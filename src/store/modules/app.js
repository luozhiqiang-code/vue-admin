import { LANG, TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true, // 左侧菜单是否打开
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 设置国际化
     */
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    /**
     * 初始化 tagsList
     */
    initTagsViewList(state) {
      state.tagsViewList = []
    },
    /**
     * 添加 tags
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      }) // 判断是否重复

      if (!isFind) {
        // 不重复
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    /**
     * 为指定的 tag 修改 title （国家化）
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        // 删除下标为index的tag
        state.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        // 删除选中的tag之外的tag
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - (payload.index + 1)
        ) // 删除index之后的
        state.tagsViewList.splice(0, payload.index) // 删除index之前的
      } else if (payload.type === 'right') {
        // 删除右侧的tag
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - (payload.index + 1)
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  actions: {}
}
