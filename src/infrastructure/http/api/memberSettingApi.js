import httpClient from '@/infrastructure/http//httpClient'

export const patchNotification = async (notification) => {
	const response = await httpClient.patch(`/member/update/notification-setting`, notification);
	return response.data;
}
export const patchNickname = async (name) => {
	const response = await httpClient.patch(`/member/update/nickname`, name);
	return response.data;
}
export const patchMBTI = async (mbti) => {
	const response = await httpClient.patch(`/member/update/mbti`, mbti);
	return response.data;
}
export const patchSelfIntro = async (description) => {
	const response = await httpClient.patch(`/member/update/description`, description);
	return response.data;
}
export const getProfileInfo = async () => {
	const response = await httpClient.get(`/member/read/personal-info`);
	return response.data;
}
export const getNotification = async () => {
	const response = await httpClient.get(`/member/notification-setting`);
	return response.data;
}