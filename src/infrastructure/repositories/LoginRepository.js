import { postLogin } from "@/infrastructure/http/api/login.js";


export class LoginRepository {
	// 피드백 전송
	async postLogin(encodedId, userData) {
		const response = await postLogin(encodedId, userData)
		return response
	}
}