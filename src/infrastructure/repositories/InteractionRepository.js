import { postInquiry ,postFeedback } from '../http/api/interactionApi'

export class InteractionRepository {
  // 문의 전송
  async postInquiry(body) {
    const response = await postInquiry(body)
    return response
  }
  // 피드백 전송
  async postFeedback(body) {
    const response = await postFeedback(body)
    return response
  }
}
