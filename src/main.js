import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/index.css'
import router from '@/router/index.js'
import pinia from './stores'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
