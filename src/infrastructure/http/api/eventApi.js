import httpClient from '@/infrastructure/http//httpClient'

export const getEventDetail = async () => {
  const response = await httpClient.get('/event/token/detail');
  return response.data.data;
}
export const getEventEndsAt = async () => {
  const response = await httpClient.get('/event/time')
  return response.data
}
