import { editSelfIntro, editNickname, editMBTI } from '../http/api/editProfile.js';

export class EditProfileRepository {
	async editSelfIntro(description) {
		const response = await editSelfIntro(description)
		return response
	}
	
	async editNickname(name) {
		const response = await editNickname(name)
		return response
	}
	
	async editMBTI(mbti) {
		const response = await editMBTI(mbti)
		return response
	}
}