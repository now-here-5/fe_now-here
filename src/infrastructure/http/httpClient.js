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
    config.headers.Authorization = `Bearer CT3QLczKARqpsu-pMfPWMkO25QaSnFmk-cadf04d2-36fa-4394-9773-7f3f1fc7fff0`
    // const store_Auth = authStore()
    // const token = store_Auth.token
    // console.log('토큰 in', token)
    // if (token) {
    //   console.log('토큰 in http:', token)
    //   config.headers.Authorization = `Bearer ${token}`
    // }
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
