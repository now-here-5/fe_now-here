import { getFeedbackTF } from "@/infrastructure/http/api/feedbackModal.js";

export class FeedbackRepository {
	async getFeedbackTF() {
		return await getFeedbackTF();
	}
}