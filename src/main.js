import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'; // 플러그인 임포트

import App from '@/App.vue'
import router from '@/presentation/router'

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPersist); // Pinia에 플러그인 추가

app.use(pinia) // createPinia()를 사용하지 않고, 이미 생성된 pinia 인스턴스를 사용합니다.
app.use(router)

app.mount('#app')