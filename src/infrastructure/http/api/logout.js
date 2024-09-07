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
		const response = await httpClient.delete(`/member/deactivate`, {
			data: content, // 'data' 키로 본문 데이터를 전달
		});
		console.log(`data`, response.data);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}