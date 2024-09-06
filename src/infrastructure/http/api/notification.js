import httpClient from '../httpClient'

export const getNotification = async () => {
	try {
		const response = await httpClient.get(`/member/notification-setting`);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}

export const patchNotification = async ( notification ) => {
	try {
		const response = await httpClient.patch(`/member/update/notification-setting`, notification);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}