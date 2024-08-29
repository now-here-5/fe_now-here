import axios from 'axios'

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
    // 예: 인증 토큰 추가
    const token = localStorage.getItem('token')
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`
      config.headers.Authorization = `Bearer    21qs-n_p1yYjTD_YarmF9Mgx1hevx5tb-7dc6d4c7-e693-4da6-84dc-3038a4710eaa`
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
