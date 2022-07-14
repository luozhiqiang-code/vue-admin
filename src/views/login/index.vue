<template>
  <div class="login-container">
    <!-- element-ui表单组件 -->
    <el-form
      class="login-form"
      ref="loginFromRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
        />
        <span class="show-pwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect/index.vue'
import { ref, computed } from 'vue'
import { validatePassword } from './rules' // 密码格式校验函数
import { useStore } from 'vuex' // 相当于redux的store
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

/**
 * el-form 使用步骤
 * 1.为el-form绑定model属性
 * 2.为el-form绑定rules属性
 * 3.为el-form绑定props属性
 *
 */

// 数据源 绑定在el-form上
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则 数据源的验证规则 绑定在el-form上
const i18n = useI18n()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: computed(() => {
        return i18n.t('msg.login.usernameRule')
      })
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 监听语言变化，重新进行表单校验。issue: https://coding.imooc.com/learn/questiondetail/254087.html
watchSwitchLang(() => {
  loginFromRef.value.validate()
})

// 处理密码框文本显示状态（展示为圆点还是明文）
const passwordType = ref('password') // 表示密码展示类型的状态
// template 中绑定的方法，直接声明即可
const onChangePwdType = () => {
  // 使用ref声明的数据，在script中使用是需要加.value来获取具体的值，
  // 但是在template中使用时，不需要加value
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录动作处理
const loading = ref(false) // 登录状态
const loginFromRef = ref(null) // 登录表单的引用
const store = useStore()
const router = useRouter()
// 登录按钮的回调函数
const handleLogin = () => {
  // 1. 进行表单校验

  loginFromRef.value.validate(valid => {
    if (!valid) return // 验证有误直接返回

    // 2.触发登录动作
    loading.value = true
    store
      .dispatch('user/login', loginForm.value) //
      .then(() => {
        loading.value = false
        // 登录后操作
        router.push('/')
      })
      .catch(err => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
