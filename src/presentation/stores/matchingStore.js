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

  return {
    recommendedMembers,
    fetchRecommendedCards,
    getRecommendedMemberAge,
    getRecommendedMemberMbtiScore,
    getRecommendedMemberGender,
    getRecommendedMemberAvatarImgUrl
  }
})
