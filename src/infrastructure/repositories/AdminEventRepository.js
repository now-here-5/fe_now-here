import { getEventList } from "@/infrastructure/http/api/adminEventApi.js";

export class AdminEventRepository {
	async getEventList() {
		return await getEventList();
	}
}