import {
  calculateMatchedScore,
  getAvatarImgUrlForMatchedInfo
} from '@/core/usecases/MatchedMembers'
import {
  calculateDateToAge,
  calculateMbtiScore,
  getMemberAvatarImgUrl,
  transformGenderToKor
} from '@/core/usecases/RecommendMember'

import { MatchingRepository } from '@/infrastructure/repositories/MatchingRepository'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const matchingRepository = new MatchingRepository()

export const useMatchingStore = defineStore('matching', () => {
  const recommendedMembers = ref([])
  const heartSendMemebers = ref([])
  const heartReceivedMemebers = ref([])
  const matchedInfoList = ref([])
  const specialHearts = ref(0)

  const fetchRecommendedCards = async () => {
    recommendedMembers.value = await matchingRepository.getRecommendedMembers()
  }

  const getRecommendedMemberAge = (member) => {
    return calculateDateToAge(member)
  }

  const getRecommendedMemberMbtiScore = (member) => {
    return calculateMbtiScore(member)
  }

  const getRecommendedMemberGender = (member) => {
    return transformGenderToKor(member)
  }

  const getRecommendedMemberAvatarImgUrl = (member) => {
    return getMemberAvatarImgUrl(member)
  }

  const fetchMatchedInfoList = async () => {
    matchedInfoList.value = await matchingRepository.getMatchedInfoForBanner()
  }

  const getMatchedInfoMbtiScore = (matchedInfo) => {
    return calculateMatchedScore(matchedInfo)
  }

  const getMatchedInfoAvatarImgUrls = (matchedInfo) => {
    return getAvatarImgUrlForMatchedInfo(matchedInfo)
  }

  const getMatchingSummaryForHomeView = () => {
    return matchingRepository.getMatchingSummary()
  }

  const fetchMatchingNotificationCounts = () => {
    return matchingRepository.getMatchingNotificationCounts()
  }

  const getMatchingNotificationList = () => {
    return matchingRepository.getMatchingNotificationList()
  }

  const sendHeart = (body) => {
    return matchingRepository.postMatchingSendHeart(body)
  }

  const getSpecialHeart = async () => {
    const res = await matchingRepository.getSpecialHeart()
    specialHearts.value = res
    return res
  }

  // 하트 수락
  const receiveHeart = (senderId) => {
    return matchingRepository.postMatchingReceiveHeart(senderId)
  }

  // 하트 거절
  const rejectHeart = (senderId) => {
    return matchingRepository.patchRejectHeart(senderId)
  }

  const getReceivedHeartList = async () => {
    heartSendMemebers.value = await matchingRepository.getMatchingReceivedHeartList()
    return heartSendMemebers.value
  }

  // 나에게 하트를 받은 멤버들 조회
  const getSentHeartList = async () => {
    heartReceivedMemebers.value = await matchingRepository.getMatchingSentHeartList()
    return heartReceivedMemebers.value
  }

  // 매칭 현황 리스트 조회
  const getMatchStatusList = async () => {
    return await matchingRepository.getMatchingMatchStatusList()
  }

  return {
    recommendedMembers,
    matchedInfoList,
    specialHearts,
    fetchRecommendedCards,
    getRecommendedMemberAge,
    getRecommendedMemberMbtiScore,
    getRecommendedMemberGender,
    getRecommendedMemberAvatarImgUrl,
    fetchMatchedInfoList,
    getMatchedInfoMbtiScore,
    getMatchedInfoAvatarImgUrls,
    getMatchingSummaryForHomeView,
    fetchMatchingNotificationCounts,
    getMatchingNotificationList,
    getSpecialHeart,
    sendHeart,
    receiveHeart,
    rejectHeart,
    getReceivedHeartList,
    getSentHeartList,
    getMatchStatusList
  }
})
