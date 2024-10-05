import { postLogin, deletLogout, patchPW } from '@/infrastructure/http/api/memberAuthApi.js'

export class MemberAuthRepository {
	async postLogin(encodedId, userData) {
		const response = await postLogin(encodedId, userData)
		return response
	}
	async patchPW(encodedId, pwData) {
		const response = await patchPW(encodedId, pwData)
		return response
	}
	async deletLogout() {
		return deletLogout()
	}
}