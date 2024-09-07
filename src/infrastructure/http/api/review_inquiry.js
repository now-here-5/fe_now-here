import httpClient from '../httpClient'
import httpClient_noneToken from '../httpClient_noneToken'

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
		const response = await httpClient.post(`/interaction/feedback`,
{ content, field }
		);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}