import httpClient from '../httpClient'

export const getEventDetail = async () => {
  try {
    const response = await httpClient.get('/event/token/detail');
    console.log('getEventDetail Authorization 헤더:', response.config.headers.Authorization);  // 여기서 헤더 확인
    console.log(`data`, response.data);
    console.log(`data.data`, response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Event detail fetching failed:', error);
    throw error;
  }
}