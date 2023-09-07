<template>
  <div id="mk_preview" v-html="marked(source)"></div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
// 配置 mared
import { marked } from 'marked'
const render = new marked.Renderer()
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true, // 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: true // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
})
// 1. 文章内容
// const content = ref('')
// const initContent = () => {
//   content.value = marked(/* 渲染的md文本，例如 '# hello\r\nworld!' */)
// }
// nextTick(() => {
//   initContent()
// })

defineProps({
  source: {
    type: String,
    default: ""
  }
});
</script>

<style scoped>
#mk_preview {
  margin-top: 20px;
  padding: 0 5px 0 5px;
}
</style>
