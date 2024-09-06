import axios from 'axios'
import { authStore } from "@/presentation/stores/AuthStore.js"

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
    const store_Auth = authStore();
    if (store_Auth.token) {
      console.log('토큰 in http:', store_Auth.token);
      config.headers.Authorization = `Bearer ${store_Auth.token}`
    }
    console.log('인터셉터 Authorization 헤더:', config.headers.Authorization);  // 여기서 확인
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
//     if (error.response?.status === 401) {
//       // 리다이렉트 또는 다른 처리
//     }
//     return Promise.reject(error)
//   }
// )

export default httpClient
