import { postRegister } from "@/infrastructure/http/api/register.js";


export class RegisterRepository {
	// 피드백 전송
	async postRegister(encodedId, userData ) {
		const response = await postRegister(encodedId, userData)
		return response
	}
}