import httpClient_noneToken from '../httpClient_noneToken'

export const postRegister = async (encodedId, userData) => {
	try {
		const response = await httpClient_noneToken.post(`/member/register/${encodedId}`, userData);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}