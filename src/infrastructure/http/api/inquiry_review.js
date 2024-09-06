import httpClient from '../httpClient'

export const postInquiry = async (content, phoneNumber) => {
	try {
		const response = await httpClient.post(`/interaction/inquiry`,
{ content, phoneNumber }
		);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}

export const postReview = async (content, field) => {
	try {
		const response = await httpClient.post(`/interaction/feed back`,
{ content, field }
		);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}