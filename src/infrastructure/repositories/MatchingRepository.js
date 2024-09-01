import { RecommendedMemberEntity } from '@/core/entities/RecommendedMemberEntity'
import { getRecommendedMembers } from '@/infrastructure/http/api/matchingApi'

export class MatchingRepository {
  /**
   * 서버로부터 추천 멤버 데이터를 받아와 RecommendedMemberEntity로 변환하는 메서드
   * @returns {Promise<RecommendedMemberEntity[]>} 멤버 엔티티 배열
   */
  async getRecommendedMembers() {
    const { data } = await getRecommendedMembers()
    const recommendedMembers = data.map((member) => new RecommendedMemberEntity(member))
    return recommendedMembers
  }
}
