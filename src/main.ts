import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./assets/styles/myTheme.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import 'bin-datav/lib/styles/index.css'
import BinDatav from 'bin-datav'
import DataVVue3 from '@kjgl77/datav-vue3'
import * as echarts from 'echarts'
import 'bin-datav/lib/styles/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import piniaPersistPlugin from 'pinia-plugin-persist'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(Antd)
app.use(DataVVue3)
app.use(BinDatav)
pinia.use(piniaPluginPersist)
app.use(pinia)
// app.use(createPinia())
// createApp(App).mount('#app')

app.config.globalProperties.$echarts = echarts
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.config.errorHandler = (err, instance, info) => {
    // 全局应用错误监听
    console.error('application-err：', err)
}
app.mount('#app')
