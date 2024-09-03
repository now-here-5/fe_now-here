import axios from 'axios'

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
    // 예: 인증 토큰 추가
    config.headers.Authorization = `Bearer 9JLsfVdbadlAK_ZPFeWrgphUCbr4iAeC-62b99b1c-06a4-46cb-aabc-7803fe171e64`
    // const token = localStorage.getItem('token')
    // if (token) {
    //   // config.headers.Authorization = `Bearer ${token}`
    //   config.headers.Authorization = `Bearer    uquXP7bgLNvnCBcc0KYQ9w-b6NyfUvxN-22359b12-2ae3-49dd-a29a-d860c4e39b83`
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
//     if (error.response?.status === 401) {
//       // 리다이렉트 또는 다른 처리
//     }
//     return Promise.reject(error)
//   }
// )

export default httpClient
