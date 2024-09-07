import httpClient_noneToken from '../httpClient_noneToken'

export const postLogin = async (encodedId, loginData) => {
	try {
		const response = await httpClient_noneToken.post(`/auth/login/${encodedId}`, loginData);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}