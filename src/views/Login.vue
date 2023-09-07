<template>
  <div class="login-wrap">
    <el-switch
        v-model="isDark"
        style="--el-switch-on-color: #141414; --el-switch-off-color: var(--el-color-primary);float: right;margin-right: 1%"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
    />
    <div class="login_dialog">
      <div class="login_title">Sift 登陆</div>
      <div class="login_form">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            class="demo-ruleForm">
          <el-form-item prop="userName">
            <el-input v-model="ruleForm.userName" type="text" autocomplete="off" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
                v-model="ruleForm.userPassword" type="password" autocomplete="off" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">登陆</el-button>
            <el-button @click="resetForm(ruleFormRef)">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {Sunny, Moon} from '@element-plus/icons-vue'
import {HttpService} from '@/axios/http'
import {ElNotification} from "element-plus";
import {isDark} from "@/composables";
import {useRouter} from 'vue-router'

const ruleFormRef = ref<FormInstance>()
const $http = new HttpService()
const $router = useRouter()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  userName: '',
  userPassword: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  userName: [{validator: validateName, trigger: 'blur'}],
  userPassword: [{validator: validatePass, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      $http.login(ruleForm).then((result: any) => {
        ElNotification.success({
          message: result.msg,
        })
        localStorage.setItem("username",ruleForm.userName)
        setTimeout(function () {
          $router.push({name: 'Home'})
        }, 3000)
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {

  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.login-wrap {
  position: absolute;
  background: url("../assets/img/bg_login.svg") no-repeat;
  width: 100%;
  height: 100%;
  color: var(--el-text-color-primary);
  background-color: var(--login-bg-color);
  user-select: none;
}

.login_dialog {
  position: relative;
  width: 30%;
  height: 30%;
  margin: 0 auto;
  border-radius: 10px;
  /*background-color: white;*/
  background-color: var(--login-bg-color);
  padding: 2%;
  /* margin-top: 10%; */
  top: 30%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
}

.login_form {
  width: 60%;
  margin: 2% auto 0;
  /*display: flex;*/
  /*justify-content: space-around;*/
}

.login_title {
  width: 60%;
  margin: 0 auto;
  text-align: left;
  font-size: 26px;
  text-shadow: 4px 4px 5px rgba(0, 0, 0, .3);
}
</style>
