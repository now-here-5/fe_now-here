import httpClient from '@/infrastructure/http//httpClient'

export const postLogin = async (encodedId, loginData) => {
	const response = await httpClient.post(`/auth/login/${encodedId}`, loginData);
	return response.data;
}
export const patchPW = async (encodedId, pwData) => {
	const response = await httpClient.patch(`/auth/update/password/${encodedId}`, pwData);
	return response.data;
}
export const deletLogout = async () => {
	const response = await httpClient.delete(`/auth/logout`);
	return response.data;
}