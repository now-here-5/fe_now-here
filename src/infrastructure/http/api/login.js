import httpClient from '../httpClient'

export const postLogin = async (encodedId, loginData) => {
	try {
		const response = await httpClient.post(`/auth/login/${encodedId}`, loginData,
		{
			headers: {
				// 토큰을 제거하려면 Authorization 헤더를 명시적으로 제거합니다.
				Authorization: undefined
			}
		}
	);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}