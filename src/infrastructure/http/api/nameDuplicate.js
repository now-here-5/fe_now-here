import httpClient_noneToken from '../httpClient_noneToken'

export const getNameDuplicate = async (eventId, name) => {
	try {
		const response = await httpClient_noneToken.get(`/member/verify/nickname/${eventId}?nickname=${name}`);
		console.log(`data`, response.data);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}