import { MatchedInfoEntity } from '@/core/entities/MatchedInfoEntity'
import { RecommendedMemberEntity } from '@/core/entities/RecommendedMemberEntity'
import {
  getMatchedInfoForBanner,
  getMatchingNotificationCount,
  getMatchingNotificationList,
  getMatchingSummary,
  getRecommendedMembers,
  postSendHeart
} from '@/infrastructure/http/api/matchingApi'

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

  /**
   * 서버로부터 매칭된 멤버 데이터를 MatchedInfoEntity로 변환하는 메서드
   * @returns {Promise<MatchedInfoEntity[]>} 매칭된 정보 엔티티 배열
   */
  async getMatchedInfoForBanner() {
    const { data } = await getMatchedInfoForBanner()
    const matchedInfoList = data.map((matchedInfo) => new MatchedInfoEntity(matchedInfo))

    return matchedInfoList
  }

  async getMatchingSummary() {
    const { data } = await getMatchingSummary()
    return data
  }

  async getMatchingNotificationCounts() {
    const { data } = await getMatchingNotificationCount()
    return data
  }

  async getMatchingNotificationList() {
    const { data } = await getMatchingNotificationList()
    return data
  }

  async postMatchingSendHeart(receiverId) {
    const res = await postSendHeart(receiverId)
    return res
  }
}
