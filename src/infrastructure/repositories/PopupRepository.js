import { getReviewTF } from "@/infrastructure/http/api/popup.js";

export class PopupRepository {
	async getReviewTF() {
		return await getReviewTF();
	}
}