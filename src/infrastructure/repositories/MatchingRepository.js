import { MatchedInfoEntity } from '@/core/entities/MatchedInfoEntity'
import { RecommendedMemberEntity } from '@/core/entities/RecommendedMemberEntity'
import {
  getMatchedInfoForBanner,
  getMatchingNotificationCount,
  getMatchingNotificationList,
  getMatchingSummary,
  getMatchStatusList,
  getReceivedHeartList,
  getRecommendedMembers,
  getSentHeartList,
  getSpecialHeart,
  postReceivedHeart,
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

  // 스페셜 하트 개수 조회
  async getSpecialHeart() {
    const { data } = await getSpecialHeart()
    return data
  }

  // 하트 보내기
  async postMatchingSendHeart(receiverId) {
    const res = await postSendHeart(receiverId)
    return res
  }

  // 하트 받기
  async postMatchingReceiveHeart(senderId) {
    const res = await postReceivedHeart(senderId)
    return res
  }

  /**
   * 서버로부터 나에게 하트를 보낸 멤버 리스트를 받아 엔티티 인스턴스화
   * @returns {Promise<RecommendedMemberEntity[]>} 멤버 엔티티 배열
   */
  async getMatchingReceivedHeartList() {
    const { data } = await getReceivedHeartList()

    const recommendedMembers = data.map((member) => {
      return new RecommendedMemberEntity(member)
    })
    return recommendedMembers
  }

  /**
   * 서버로부터 내가 하트를 보낸 멤버 리스트를 받아 엔티티 인스턴스화
   * @returns {Promise<RecommendedMemberEntity[]>} 멤버 엔티티 배열
   */
  async getMatchingSentHeartList() {
    const { data } = await getSentHeartList()
    const sentHeartMembers = data.map((member) => {
      return new RecommendedMemberEntity(member)
    })
    return sentHeartMembers
  }

  /**
   * 서버로부터 매칭 현황 리스트를 받아 엔티티 인스턴스화
   * @returns {Promise<RecommendedMemberEntity[]>} 멤버 엔티티 배열
   */
  async getMatchingMatchStatusList() {
    const { data } = await getMatchStatusList()
    const mathStatusList = data.map((member) => {
      return new RecommendedMemberEntity(member)
    })
    return mathStatusList
  }
}
