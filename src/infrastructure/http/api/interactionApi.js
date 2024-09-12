import httpClient from '@/infrastructure/http//httpClient'

export const postInquiry = async (body) => {
  const response = await httpClient.post(`/interaction/inquiry`, body);
  return response;
}
export const postFeedback = async (body) => {
  const response = await httpClient.post('/interaction/feedback', body)
  return response
}
export const getFeedbackModal = async ( ) => {
  const response = await httpClient.get(`/interaction/feedback/status`);
  return response.data;
}