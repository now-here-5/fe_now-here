import { postInquiry, postFeedback, getFeedbackModal } from '@/infrastructure/http/api/interactionApi.js'

export class InteractionRepository {
  async postInquiry(body) {
    const response = await postInquiry(body)
    return response
  }
  async postFeedback(body) {
    const response = await postFeedback(body)
    return response
  }
  async getFeedbackModal() {
    return await getFeedbackModal();
  }
}
