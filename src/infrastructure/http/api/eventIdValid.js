import httpClient from '../httpClient'

export const getEventList = async () => {
	try {
		const response = await httpClient.get('/admin/event/list?status=true');
		console.log(`data`, response.data);
		console.log(`data.data`, response.data.data)
		console.log(`data.data`, response.data.data.eventList)
		return response.data.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}