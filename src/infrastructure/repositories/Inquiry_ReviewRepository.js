import { postInquiry, postReview } from "@/infrastructure/http/api/inquiry_review.js";


export class InquiryReviewRepository {
	async postInquiry(content, phoneNumber) {
		const response = await postInquiry(content, phoneNumber)
		return response
	}
	
	async postReview(content, field) {
		const response = await postReview(content, field)
		return response
	}
}