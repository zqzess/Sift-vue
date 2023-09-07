<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">
      🏠 主页
    </el-breadcrumb-item>
    <el-breadcrumb-item
    ><a href="/edit">文本编辑</a></el-breadcrumb-item
    >
  </el-breadcrumb>
  <div class="edit_content" v-loading="loading">
    <monaco-editor class="edit_content_input" :modelValue="monacoEditor.editor.model" :language="languageType" v-show="!loading"></monaco-editor>
    <div class="edit_content_space" v-if="isMarkDown" v-show="!loading"></div>
<!--    <MarkdownRenderer class="edit_content_preview" :source="monacoEditor.editor.model" v-if="isMarkDown"></MarkdownRenderer>-->
    <MarkDownPreview class="edit_content_preview" :source="monacoEditor.editor.model" v-if="isMarkDown" v-show="!loading"></MarkDownPreview>
  </div>

</template>

<script lang="ts" setup>
import MonacoEditor from "@/components/MonacoEditor.vue";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue"
import MarkDownPreview from "@/components/MarkDownPerview.vue"
import stores from "@/stores";
import {HttpService} from "@/axios/http";
import {onMounted, ref} from "vue";
import {ResultDef, ResultRes} from "@/utils/beans";
import {ElNotification as Notify} from "element-plus";
const $http = new HttpService()
const monacoEditor = stores.monacoEditorStore()
const fileStores = stores.fileListStore()
const isMarkDown = ref(fileStores.getFile.fileMediaType === 4)
const languageType = ref(fileStores.getFileSuffix + '')
const loading = ref(true)
const getFile = () =>{
  if (fileStores.getFile === undefined) {
    return Notify.error("没有文件id")
  }
  $http.get({fileId: fileStores.getFile?.fileId}, 'v1', '/test/getFile').then((res:ResultRes) => {
    $http.get(null, res.data.filePath).then((res:ResultDef) => {
      monacoEditor.setModel(res.data)
      setTimeout(() => loading.value = false, 300)
    }).catch(res => {
      loading.value = false
      Notify.error({message: res.data?.status + ' ' + res.data?.path + res.data?.err})
    })
  }).catch(res => {
    loading.value = false
    Notify.error({message: res.data?.status + ' ' + res.data?.path + res.data?.err})
  })
}
onMounted(()=>{
  getFile()
})
</script>
<style src="../assets/css/EditModule.css" scoped></style>
<style scoped>
.edit_content {
  display: flex;
  flex-direction: row;
  height: 70%;
}
/*.edit_content:after {*/
/*  content: "";*/
/*  position: absolute;*/
/*  top: 0;*/
/*  left: 0;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  background-color: rgba(0, 0, 0, 0.5);*/
/*}*/
.edit_content_input {
  flex: 1;
}
.edit_content_space {
  width: 1px;
  background-color: #888888;
  margin: 30px 10px 10px 10px;
}
.edit_content_preview {
  flex: 1;
  overflow-y: auto;
  background-color: aliceblue;
}
</style>
