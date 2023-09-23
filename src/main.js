import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/index.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/util/axios.config"
// 粒子库
import Particles from "particles.vue3"  
import dataV from '@jiaminghi/data-view'
// import DataV, { setClassNamePrefix } from '@dataview/datav-vue3';

createApp(App).use(Particles).use(dataV).use(ElementPlus).use(store).use(router).mount('#app')
