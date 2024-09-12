import axios from 'axios'
import { useAuthStore } from '@/presentation/stores/authStore.js'

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
    const authStore = useAuthStore()
    const token = authStore.token
    const excludeUrls = [
      '/admin/event/list',
      '/interaction/inquiry',
      '/member/verify',
      '/member/register',
      '/auth/login'
    ];
    const isExcluded = excludeUrls.some((url) => config.url.includes(url));
    if (token && !isExcluded) {
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
//     if (error.response?.status === 401) {
//       // 리다이렉트 또는 다른 처리
//     }
//     return Promise.reject(error)
//   }
// )

export default httpClient
