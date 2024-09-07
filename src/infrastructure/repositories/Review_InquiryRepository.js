import { postInquiry, postReview } from "@/infrastructure/http/api/review_inquiry.js";


export class Review_InquiryRepository {
	async postInquiry(content, phoneNumber) {
		const response = await postInquiry(content, phoneNumber)
		return response
	}
	
	async postReview(content, field) {
		const response = await postReview(content, field)
		return response
	}
}