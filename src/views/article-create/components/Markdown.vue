<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object // 编辑文章时获得的原文中数据会通过父组件传递过来
  }
})

const emits = defineEmits(['onSuccess'])

// 初始化editor
// Editor实例
let mkEditor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor() // dom挂载后才开始初始化Markdown插件
})

const store = useStore()
const initEditor = () => {
  // 该函数要等到dom渲染完后才能调用
  mkEditor = new MkEditor({
    el, // 渲染的区域
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })

  mkEditor.getMarkdown()
}

// 监听语言变化
watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML() // 切换语言要保证用户输入的数据不丢失，暂存一份
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

// 编辑相关，如果父组件传递过来的detail发送改变，则将新的内容渲染到编辑器上
watch(
  () => props.detail,
  val => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)

// 处理提交
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 如果有文章内容和文章id则是编辑旧文章
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }

  mkEditor.reset()
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
