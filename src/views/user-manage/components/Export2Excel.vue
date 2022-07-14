<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { getUserManageAllList } from '@/api/user-manage'
import { defineProps, defineEmits, ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFormat } from '@/utils/date'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue']) // 父组件的回调函数
/**
 * 导出文件名相关
 */
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
// 保证语言切换后输入框的导出文件名有随之切换
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 从后台请求所有表格内容的json数据
  const allUser = (await getUserManageAllList()).list
  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser) // 将json转换为二维数组
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
  closed()
}
// 当使用export_json_to_excel 的时候，传递的data数据必须是一个二维数组，二维数组的每个元素代表一行
// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  console.log(headers, rows)
  return rows.map(item => {
    return Object.keys(headers).map(key => {
      // 时间特殊处理(excel时间格式有坑)
      if (headers[key] === 'openTime') {
        return dateFormat(item[headers[key]])
      }
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]

        return JSON.stringify(roles.map(role => role.title))
      }
      return item[headers[key]]
    })
  })
}

/**
 * 关闭
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false) // 父组件的回调，修改props传入的modelvalue，从而关闭当前的组件
}
</script>

<style lang="scss" scoped></style>
