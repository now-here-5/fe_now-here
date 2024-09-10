import { postLogin, deletLogout } from '@/infrastructure/http/api/memberAuthApi.js'

export class MemberAuthRepository {
	async postLogin(encodedId, userData) {
		const response = await postLogin(encodedId, userData)
		return response
	}
	async deletLogout() {
		return deletLogout()
	}
}