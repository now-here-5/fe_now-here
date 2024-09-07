import { profileInfo } from "@/infrastructure/http/api/profileInfo.js";


export class ProfileRepository {
	// 피드백 전송
	async profileInfo(encodedId, userData ) {
		const response = await profileInfo(encodedId, userData)
		return response
	}
}