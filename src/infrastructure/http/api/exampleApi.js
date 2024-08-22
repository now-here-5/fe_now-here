import httpClient from './httpClient'

// API 레이어: 특정 API 엔드포인트를 호출하는 함수를 정의

export const getTodos = async () => {
  const response = await httpClient.get('/todos')
  return response.data
}

export const addTodo = async (todo) => {
  const response = await httpClient.post('/todos', todo)
  return response.data
}
