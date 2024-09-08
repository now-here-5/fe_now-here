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

  const sendHeart = (receiverId) => {
    return matchingRepository.postMatchingSendHeart(receiverId)
  }

  const receiveHeart = (senderId) => {
    return matchingRepository.postMatchingReceiveHeart(senderId)
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

  return {
    recommendedMembers,
    matchedInfoList,
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
    sendHeart,
    receiveHeart,
    getReceivedHeartList,
    getSentHeartList
  }
})
