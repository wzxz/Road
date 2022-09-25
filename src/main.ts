import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 路由
import router from '@/route/index'
app.use(router)

// pinia
import {createPinia} from 'pinia';
const pinia = createPinia()
app.use(pinia)

// import VueDraggable from 'vue-draggable'
// app.use(VueDraggable)

app.mount('#app')
