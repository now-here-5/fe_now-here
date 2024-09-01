import { postDirectReview } from '@/infrastructure/http/api/reviewApi'

export class ReviewRepository {
  async postDirectReview(review) {
    return await postDirectReview(review)
  }
}
