<template>
  <el-container class="container">
    <el-header class="header">
      <HeaderBar></HeaderBar>
    </el-header>
    <el-main class="body_main">
      <router-view></router-view>
<!--      <FileList></FileList>-->
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import process from "../../env.d"
import {UploadFilled, Folder, DocumentAdd} from "@element-plus/icons-vue";
import {ElNotification, genFileId} from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import {ref} from "vue";
import {onMounted} from "vue";
import FileList from '../components/FileList.vue'
import HeaderBar from '../components/HeaderBar.vue'
import {HttpService} from "@/axios/http";
const $http = new HttpService()

</script>

<style>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 2%;
  background-color: var(--home-bg-color);
}
.header {
  display: flex;
  height: 5%;
  flex-direction: row;
  position: absolute;
  width: 96%;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 1%;
  color: var(--home-file-list-text-color);
  z-index: 5;
}
.body_main {
  position: relative;
  top: 6%;
  width: 100%;
  height: 100%;
}
</style>
