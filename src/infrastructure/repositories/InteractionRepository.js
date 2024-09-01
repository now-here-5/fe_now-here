import { postFeedback } from '../http/api/interactionApi'

export class InteractionRepository {
  // 피드백 전송
  async postFeedback(body) {
    const response = await postFeedback(body)

    return response
  }
}
