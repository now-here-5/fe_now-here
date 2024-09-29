import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate' // pinia persist 추가

import App from '@/App.vue'
import router from '@/presentation/router'
import VueGtag from 'vue-gtag-next'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist) // Pinia에 persist 추가

app.use(pinia) // 이미 생성된 pinia 사용
app.use(router)

app.use(
  VueGtag,
  {
    property: {
      id: 'G-KMRVZ0WBRB'
    }
  },
  router
)

app.mount('#app')
