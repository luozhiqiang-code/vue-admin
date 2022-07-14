<template>
  <div class="app-main">
    <!-- 路由出口，相当于<Outlet/> -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <!-- keep-alive用于缓存选择的路由，来回切换父路由，则子路由中的结果被缓存 -->
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { isTags } from '@/utils/tags'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()

/**
 * 生成 Tagview的title
 */
const getTitle = route => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    // 取当前路由路径的最后一个路径作为title
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    // 有meta，用meta作为title
    title = generateTitle(route.meta.title)
  }
  return title
}

/**
 * 监听路由变化
 */
const store = useStore()
watch(
  route,
  (to, from) => {
    // 并不是所有路由都需要保存
    if (!isTags(to.path)) return // 不需要保存的路由

    // 需要保存的路由
    // 解构获得需要路由的属性
    const { fullPath, meta, name, params, path, query } = to
    // 根据路由添加tagView
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true // 表示组件被创建就要触发一次
  }
)

/**
 * 国际化 tags
 * 语言变化是会出发该回调函数
 */
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route) // 解构原对象，赋值一个新的title
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
