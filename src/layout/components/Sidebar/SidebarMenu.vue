<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import SidebarItem from './SidebarItem'
import { useRouter, useRoute } from 'vue-router' // 获取路由表
import { filterRouters, generateMenus } from '@/utils/route' // 路由处理工具，获取用于渲染菜单的路由表

// 计算路由表结构
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())

  return generateMenus(filterRoutes)
})
// console.log(router.getRoutes()) 所获取的完整路由表，里面会把嵌套的路由全部列举出来。
// 计算高亮 menu 的方法
const route = useRoute()
// 默认激活菜单为url的路由菜单
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss" scoped></style>
