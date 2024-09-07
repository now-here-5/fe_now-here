import axios from 'axios'

console.log(import.meta.env.VITE_API_BASE_URL)
const httpClient_noneToken = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default httpClient_noneToken
