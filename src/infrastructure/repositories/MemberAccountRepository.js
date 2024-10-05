import { postAuthNumber, postRegister, getAuthNumber, getIDDuplicate, getNameDuplicate, deleteAccount } from '@/infrastructure/http/api/memberAccountApi.js';

export class MemberAccountRepository {
	async postAuthNumber(phone, authNum) {
		const response = await postAuthNumber(phone, authNum)
		return response
	}
	async postRegister(encodedId, userData) {
		const response = await postRegister(encodedId, userData)
		return response
	}
	async getAuthNumber(eventId, phone, forReset) {
		const response = await getAuthNumber(eventId, phone, forReset)
		return response
	}
	async getIDDuplicate(eventId, ID) {
		const response = await getIDDuplicate(eventId, ID)
		return response
	}
	async getNameDuplicate(eventId, name) {
		const response = await getNameDuplicate(eventId, name)
		return response
	}
	async deleteAccount(content) {
		const response = await deleteAccount(content)
		return response
	}
}