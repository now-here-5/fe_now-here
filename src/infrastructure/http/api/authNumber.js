import httpClient from '../httpClient'

export const getAuthNumber = async ( eventId, phone ) => {
	try {
		const response = await httpClient.get(`/member/verify/${eventId}?phone=${phone}`);
		console.log(`data`, response.data);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}

export const postAuthNumber = async ( phone, authNum ) => {
	try {
		const response = await httpClient.post(`/member/verify/code?phone=${phone}&code=${authNum}`);
		console.log(`data`, response.data);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}