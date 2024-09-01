// import { MatchedInfoEntity } from "../entities/MatchedInfoEntity"

import { MBTI_SCORES } from '@/data/mbtiScore'

/**
 * 주어진 매칭 정보를 이용해 두 멤버의 케미 점수를 계산하는 함수
 * @param {MatchedInfoEntity} matchedInfo
 * @returns {score} 케미 점수
 */
export const calculateMatchedScore = (matchedInfo) => {
  const score = MBTI_SCORES[matchedInfo.senderMbti]?.[matchedInfo.receiverMbti]

  return score
}

/**
 * 주어진 매칭 정보를 이용해 두 멤버의 아바타 이미지 url 반환하는 함수
 * @param {MatchedInfoEntity} matchedInfo
 * @returns {senderImgUrl, receiverImgUrl} 멤버들의 아바타 이미지 url
 */
export const getAvatarImgUrlForMatchedInfo = (matchedInfo) => {
  const getAvatarImgUrl = (gender, mbti) => {
    const genderFolder = gender === 'MALE' ? 'Male' : 'Female'
    return `/src/assets/images/avatar_MBTI_${genderFolder}/avatar_${mbti}_${genderFolder}.png`
  }

  const senderAvatarImgUrl = getAvatarImgUrl(matchedInfo.senderGender, matchedInfo.senderMbti)
  const receiverAvatarImgUrl = getAvatarImgUrl(matchedInfo.receiverGender, matchedInfo.receiverMbti)

  return { senderAvatarImgUrl, receiverAvatarImgUrl }
}
