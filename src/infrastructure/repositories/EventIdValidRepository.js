import { getEventList } from "@/infrastructure/http/api/eventIdValid.js";

export class EventIdValidRepository {
	async getEventList() {
		return await getEventList();
	}
}