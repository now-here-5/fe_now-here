import { getAuthNumber, postAuthNumber } from '../http/api/authNumber.js';

export class AuthPhoneRepository {
	async getAuthNumber(eventId,phone) {
		const response = await getAuthNumber(eventId, phone)
		return response
	}
	
	async postAuthNumber( phone,authNum ) {
		const response = await postAuthNumber( phone, authNum )
		return response
	}
}