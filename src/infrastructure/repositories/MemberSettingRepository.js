import {
	patchSnsId,
	patchNotification,
	patchNickname,
	patchMBTI,
	patchSelfIntro,
	patchBirth,
	getProfileInfo,
	getNotification,
} from '../http/api/memberSettingApi.js'

export class MemberSettingRepository {
	async patchSnsId(snsId) {
		const response = await patchSnsId(snsId)
		return response
	}
	async patchNotification(notification) {
		const response = await patchNotification(notification)
		return response
	}
	async patchNickname(name) {
		const response = await patchNickname(name)
		return response
	}
	async patchMBTI(mbti) {
		const response = await patchMBTI(mbti)
		return response
	}
	async patchSelfIntro(description) {
		const response = await patchSelfIntro(description)
		return response
	}
	async patchBirth(birth) {
		const response = await patchBirth(birth)
		return response
	}
	async getProfileInfo(encodedId, userData ) {
		const response = await getProfileInfo(encodedId, userData)
		return response
	}
	async getNotification () {
		return await getNotification();
	}
}