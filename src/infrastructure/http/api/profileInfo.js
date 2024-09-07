import httpClient from '../httpClient'

export const profileInfo = async () => {
	try {
		const response = await httpClient.get(`/member/read/personal-info`);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}