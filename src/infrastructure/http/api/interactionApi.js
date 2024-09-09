import httpClient from '../httpClient'

// 문의 작성
export const postInquiry = async (body) => {
  const response = await httpClient.post(`/interaction/inquiry`, body);
  return response;
}
// 피드백 작성
export const postFeedback = async (body) => {
  const response = await httpClient.post('/interaction/feedback', body)
  return response
}