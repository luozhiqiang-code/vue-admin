<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { userBatchImport } from '@/api/user-manage'
import { USER_RELATIONS, formatDate } from './utils'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
/**
 * 数据解析成功之后的回调
 */
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results) // 获取转换中英文之后的数据

  await userBatchImport(updateData) // 上传到数据库
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  }) // 提升上传成功
  router.push('/user/manage') // 跳转到管理页面
}

/**
 * 筛选数据 遍历上传的数据，把中文标题名改为英文。
 */
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
      if (USER_RELATIONS[key] === 'openTime') {
        // 转换对象的key为英文
        userInfo[USER_RELATIONS[key]] = formatDate(item[key]) // formatDate是处理excel日期格式，这是excel的毛病
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
