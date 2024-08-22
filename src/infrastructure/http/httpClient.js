import axios from 'axios'

const httpClient = axios.create({
  // TODO: 추후 baseURL 설정 필요
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터
// httpClient.interceptors.request.use(
//   (config) => {
//     // 예: 인증 토큰 추가
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

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
