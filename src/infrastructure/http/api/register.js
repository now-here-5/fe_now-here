import httpClient from '../httpClient'

export const postRegister = async (encodedId, userData) => {
	try {
		const response = await httpClient.post(`/member/register/${encodedId}`, userData,);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}