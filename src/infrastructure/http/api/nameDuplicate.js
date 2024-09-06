import httpClient from '../httpClient'

export const getNameDuplicate = async (eventId, name) => {
	try {
		const response = await httpClient.get(`/member/verify/nickname/${eventId}?nickname=${name}`);
		console.log(`data`, response.data);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}