import axios from 'axios'
import { authStore } from '@/presentation/stores/authStore.js'

console.log(import.meta.env.VITE_API_BASE_URL)
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터
httpClient.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer EUpGGO6Xc2jVcOjGXqDA7FzIDBqp8S6C-546f8211-76ff-4bc2-9822-aa2b2d2c1671`
    const store_Auth = authStore()
    const token = store_Auth.token
    console.log('토큰 in', token)
    if (token) {
      console.log('토큰 in http:', token)
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // 예: 인증 오류 처리
//     if (error.response?.status === 400) {
//       alert(error.response?.data.message)
//       // alert(error.response.message)
//     }
//     return Promise.reject(error)
//   }
// )

export default httpClient
