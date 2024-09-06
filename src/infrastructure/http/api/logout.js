import httpClient from '../httpClient'

export const deletLogout = async () => {
	try {
		const response = await httpClient.delete(`/auth/logout`);
		console.log(`data`, response.data);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}

export const deleteAccount = async (content) => {
	try {
		const response = await httpClient.delete(`/member/deactivate`, content);
		console.log(`data`, response.data);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}