import httpClient from '@/infrastructure/http//httpClient'

export const getEventList = async () => {
	const response = await httpClient.get('/admin/event/list?status=true');
	return response.data.data;
}