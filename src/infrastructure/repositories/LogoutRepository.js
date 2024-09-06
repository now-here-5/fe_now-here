import { deletLogout, deleteAccount } from "@/infrastructure/http/api/logout.js";


export class LogoutRepository {
	async deletLogout() {
		return deletLogout()
	}
	
	async deleteAccount(content) {
		const response = await deleteAccount(content)
		return response
	}
}
