<template>
  <el-breadcrumb separator="/" style="margin-bottom: 10px">
    <el-breadcrumb-item :to="{ path: '/home' }">🏠 主页</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="menuBar">
    <el-input size="small" style="margin-right: 12px"></el-input>
    <el-button type="info" :icon="DocumentAdd" />
    <el-button type="primary" :icon="Folder" />
    <el-button type="warning" :icon="UploadFilled" @click="uploadDialogVisible = true"/>
  </div>
  <div class="body_file_list">
    <div class="body_file_list_title">
      <div class="body_file_list_item_text">名称</div>
      <div class="body_file_list_item_text">大小</div>
      <div class="body_file_list_item_text mediaHide">上传者</div>
      <div class="body_file_list_item_text mediaHide">权限</div>
      <div class="body_file_list_item_text mediaHide2">修改时间</div>
    </div>
    <div class="body_file_list_table">
      <div class="body_file_list_item" v-for="(item, index) in fileList" :key="index" @click="checkFile(item)">
        <div class="body_file_list_item_hover">
          <div class="body_file_list_item_text">{{item.fileName}}</div>
          <div class="body_file_list_item_text">{{item.fileSize}}</div>
          <div class="body_file_list_item_text mediaHide">{{item.fileUploadUserName}}</div>
          <div class="body_file_list_item_text mediaHide">{{item.fileRank}}</div>
          <div class="body_file_list_item_text mediaHide2">{{item.fileUpdateTime}}</div>
        </div>
      </div>
    </div>
    <el-pagination
        style="align-self: end;margin-right: 0.75rem"
        v-model:current-page="fileStores.filePage.page"
        v-model:page-size="fileStores.filePage.pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        layout=" prev, pager, next, sizes, total"
        :total="fileListTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="false"
    />
  </div>

  <el-dialog v-model="uploadDialogVisible" title="文件上传" width="40%" draggable :modal="false" append-to-body>
    <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :action="uploadUrl"
        :auto-upload="false"
        :limit="1"
        with-credentials
        :headers="{'Authorization': userToken}"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-exceed="handleExceed">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖到文件到此处或<em>点击选择文件上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          一次只能上传一个文件
        </div>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadDialogVisible = false"> 取消</el-button>
        <el-button type="primary" @click="submitUpload"> 上传</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import process from "../../env.d"
import {FileMediaType} from "@/utils/static";
import {UploadFilled, Folder, DocumentAdd} from "@element-plus/icons-vue";
import {ElNotification as nofity, genFileId} from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import {onMounted, ref} from "vue";
import {HttpService} from "@/axios/http";
import {FileItem, ResultRes} from "@/utils/beans";
import stores from "@/stores";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
const $http = new HttpService()
const uploadDialogVisible = ref(false)
const upload = ref<UploadInstance>()
const userToken = ref(localStorage.getItem("id_token"))
const uploadUrl = process.HOST + '/v1/file/upload'
const currentPage = ref(1)
const pageSize = ref(5)
const fileListTotal = ref(10)
const monacoEditor = stores.monacoEditorStore()
const fileStores = stores.fileListStore()
// const { editor } = storeToRefs(monacoEditor)
// const { setFile } = monacoEditor
const $router = useRouter()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const fileList = ref<FileItem[]>([])
const submitUpload = () => {
  upload.value!.submit()
}
const uploadSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) =>  {
  if (response.code === '200') {
    nofity.success({
      message: response.msg,
    })
    reFreshFileList()
  }
  else {
    nofity.error({
      message: response.msg,
    })
  }
}
const uploadError : UploadProps['onError'] = (
    error: Error,
    uploadFile
) =>  {
  if (error.message) {
    let data = null
    try {
      data = JSON.parse(error.message).msg
    }catch (e) {
      data = error.message
    }
    if (data === null || data === '') {
      data = " 上传失败！"
    }
    nofity.error({
      message: data,
    })
  }
}
const handleSizeChange = (val: number) => {
  reFreshFileList()
}
const handleCurrentChange = (val: number) => {
  reFreshFileList()
}
onMounted(()=>{
  reFreshFileList()
})
/**
 *  刷新文件列表
 */
const reFreshFileList = () => {
  $http.getData({page: fileStores.filePage.page, pageSize: fileStores.filePage.pageSize}, true, null, 'v1', '/file/list').then((res:ResultRes) => {
    fileListTotal.value = res.data.total
    fileList.value = res.data.list
    uploadDialogVisible.value = false
  })
}
const checkFile = (item:FileItem) => {
  if (item.fileMediaType === null) {
    return nofity.error('文件类型为空')
  }

  //  文本类型
  if (item.fileMediaType === FileMediaType.TXT.type) {
    fileStores.setFile(item)
    return  $router.push({name:'Edit'})
  }

  if (item.fileMediaType === FileMediaType.TXTVIEW.type) {
    fileStores.setFile(item)
    return  $router.push({name:'Edit'})
  }

  return nofity.warning("暂不支持该类型")
}
</script>
<style src="../assets/css/FileListResponsive.css" scoped></style>
<style scoped>
.menuBar {
  display: flex;
}
.body_file_list {
  position: relative;
  margin-top: 10px;
  background-color: var(--home-file-list-bg-color);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-color);
  min-height: 1rem;
  max-height: 80%;
  /*height: 80%;*/
  cursor: pointer;
  padding-bottom: 0.5rem;
  overflow-y: hidden;
  row-gap: 0.25rem;
  display: flex;
  flex-direction: column;
}
.body_file_list_table {
  overflow-y: auto;
  position: relative;
  margin-top: 10px;
  background-color: var(--home-file-list-bg-color);
  min-height: 1rem;
  max-height: 70%;
  border-radius: 0.75rem;
  cursor: pointer;
  margin-bottom: 1rem;
}
.body_file_list_title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #687076;
  padding: 0.75rem;
  transform: scale(0.98);
}
.body_file_list_item {
  padding: 0.2rem;
  color: var(--home-file-list-text-color);
}
.body_file_list_item_hover {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  --motion-scale: 0.98;
  transform: scale(var(--motion-scale));
  padding: 0.5rem;
  user-select: none;
  transition: all 0.3s ease 0s;
  border-radius: 0.5rem;
}
.body_file_list_item_hover:hover{
  transform: scale(0.99);
  background-color: rgba(132, 133, 141, 0.18);
}
.body_file_list_item_text {
  flex: 1;
  /*text-align: left;*/
}
</style>
