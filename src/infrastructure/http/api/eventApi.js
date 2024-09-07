import httpClient from '../httpClient'

// API 레이어: 특정 API 엔드포인트를 호출하는 함수를 정의

export const getEventEndsAt = async () => {
  const response = await httpClient.get('/event/time')
  return response.data
}
