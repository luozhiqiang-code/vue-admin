import i18n from '@/i18n' // 在非组件模块中直接导入使用i18n实例,在组件中才可以使用useI18n

// 账户密码的验证函数
export const validatePassword = () => {
  return (rule, value, callback) => {
    // 密码不能小于六位，否则报错
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
