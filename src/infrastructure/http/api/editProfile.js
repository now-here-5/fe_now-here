import httpClient from '../httpClient'

export const editSelfIntro = async (description) => {
	try {
		const response = await httpClient.patch(`/member/update/description`, description);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}

export const editNickname = async (name) => {
	try {
		const response = await httpClient.patch(`/member/update/nickname`, name);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}

export const editMBTI = async (mbti) => {
	try {
		const response = await httpClient.patch(`/member/update/mbti`, mbti);
		return response.data;
	} catch (error) {
		console.error('Event detail fetching failed:', error);
		throw error;
	}
}