import httpClient from '../httpClient'

// 피드백 작성
export const postFeedback = async (body) => {
  const response = await httpClient.post('/interaction/feedback', body)
  return response
}
