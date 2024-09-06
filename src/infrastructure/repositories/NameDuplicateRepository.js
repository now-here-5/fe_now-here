import { getNameDuplicate } from "@/infrastructure/http/api/nameDuplicate.js";

export class NameDuplicateRepository {
	async getNameDuplicate(eventId,name) {
		const response = await getNameDuplicate(eventId, name)
		return response
	}
}