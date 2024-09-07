import httpClient from '../httpClient'

export const getReviewTF = async ( ) => {
  try {
    const response = await httpClient.get(`/interaction/feedback/status`);
    console.log(`data`, response.data);
    return response.data;
  } catch (error) {
    console.error('Event detail fetching failed:', error);
    throw error;
  }
}
