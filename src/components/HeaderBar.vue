<template>
  <div style="float: left" class="header_logo" @click="backToHome"></div>
  <div style="display: flex">
    <div class="header_item mediaHide_headerBar">
      <el-icon>
        <Monitor/>
      </el-icon>
      <div @click="clickEvent">监控</div>
    </div>
    <div class="header_item header_item_set" style="margin-left: 10px">
      <el-icon>
        <Setting/>
      </el-icon>
      <div>设置</div>
    </div>
    <el-tooltip
        class="box-item"
        effect="dark"
        content="退出登录"
        placement="top"
    >
      <div class="header_item header_item_user">
        <el-icon>
          <User/>
        </el-icon>
        <div class="header_user_name">{{userName}}</div>
      </div>
    </el-tooltip>

    <a-dropdown placement="bottom">
      <div id="header_item_icon_box" class="header_item_icon_box" :class="dynamicStyle" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <img class="header_item_icon" :src="dynamicStyleIcon"/>
        <div v-show="dynamicUser" class="header_item_icon_text">{{userName}}</div>
      </div>
      <template #overlay>
        <a-menu style="text-align: center">
          <a-menu-item>
            <a href="javascript:;">退出登录</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">设置</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>


<!--    <a-popover>-->
<!--      <template #content>-->
<!--        <p>退出登录</p>-->
<!--        <p>设置</p>-->
<!--      </template>-->
<!--      <div class="header_item_icon_box" :class="dynamicStyle" @mouseover="mouseEnter" @mouseleave="mouseLeave">-->
<!--        <img class="header_item_icon" :src="dynamicStyleIcon"/>-->
<!--        <div v-show="dynamicUser" class="header_item_icon_text">{{userName}}</div>-->
<!--      </div>-->
<!--    </a-popover>-->

  </div>
  <div class="myMonitorDialog" v-if="monitorDialogVisible">
    <div class="myMonitorDialog_header">
      <el-icon @click="monitorDialogVisible=false">
        <Close/>
      </el-icon>
    </div>
    <MonitorDialog></MonitorDialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";
import * as echarts from 'echarts'
import {onMounted} from "vue";
import {HttpService} from "@/axios/http";
import {ResultRes} from "@/utils/beans";
import HeaderBar from './MonitorDialog.vue'
import {User} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import router from "@/router";
import imgurl from '../assets/img/avator.jpg'
const $http = new HttpService()
const $router = useRouter()
const monitorDialogVisible = ref(false)
const dynamicStyleIcon = ref(imgurl)
const backToHome = () => {
  if ($router.currentRoute.value.path !== '/home') {
    $router.push({name: 'Home'})
  }
}

const clickEvent = () => {
  monitorDialogVisible.value = true
}

const dynamicStyle = ref()
const dynamicUser = ref(false)
const userName = ref(localStorage.getItem("username"))
const mouseEnter = () => {
  dynamicStyle.value = 'dynamicStyle'
  dynamicUser.value = true
}

const mouseLeave = () => {
  dynamicStyle.value = ''
  dynamicUser.value = false
}
</script>
<style src="../assets/css/HeaderBarResponsive.css" scoped></style>
<style scoped>
.header_item_user {
  margin-left: 10px;
}

.header_item {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.myMonitorDialog {
  z-index: 5;
  width: 500px;
  height: 500px;
  position: absolute;
  top: 80%;
  right: 20px;
  background-color: var(--home-file-list-bg-color);
  box-shadow: var(--shadow-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 1rem;
}

.myMonitorDialog_header {
  cursor: pointer;
  user-select: none;
}

.header_item:hover {
  color: dodgerblue;
}
.header_logo {
  background: url("../assets/img/logo.svg") no-repeat;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  padding: 1px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
  transition: all 0.2s ease 0s;
  cursor: pointer;
}
.header_logo:hover {
  transform: scale(1.1);
  transition: all 0.2s ease 0s;
  cursor: pointer;
}
.header_item_icon_box {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
  transition: all 0.2s ease 0s;
}
.header_item_icon {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  /*background-color: black;*/
  margin: 5px;
}
.header_item_icon_text {
  width: 40px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
}
.dynamicStyle {
  margin-left: 10px;
  width: 100px;
  height: 40px;
  border-radius: 40px;
  background-color: white;
  transition: all 0.2s ease 0s;
}
</style>
