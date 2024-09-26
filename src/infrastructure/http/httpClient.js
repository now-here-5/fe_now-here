import axios from 'axios'
import { useAuthStore } from '@/presentation/stores/authStore.js'
import { useSettingStore } from '@/presentation/stores/settingStore'

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
      '/event/list',
      '/interaction/inquiry',
      '/member/verify',
      '/member/register',
      '/auth/login'
    ]
    const isExcluded = excludeUrls.some((url) => config.url.includes(url))
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
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예: 인증 오류 처리
    if (error.response?.status === 401) {
      const settingStore = useSettingStore()
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.')
      settingStore.initUserInfo()
      // alert(error.response.message)
    }
    return Promise.reject(error)
  }
)

export default httpClient
