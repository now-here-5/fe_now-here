// import { RecommendedMemberEntity } from '../entities/RecommendedMemberEntity'

import { MBTI_SCORES } from '@/data/mbtiScore'

/**
 * 주어진 멤버의 생년월일을 이용해 나이를 계산하는 함수
 * @param {RecommendedMemberEntity} member
 * @returns {number} 나이
 */
export const calculateDateToAge = (member) => {
  const birthDate = new Date(member.birthdate)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

/**
 * 주어진 멤버의 MBTI를 받아 사용자와의 케미 점수를 계산하는 함수
 * @param {RecommendedMemberEntity} member
 * @returns {score} 케미 점수
 */
export const calculateMbtiScore = (member) => {
  // TODO: 'ISTJ' 부분에 사용자의 MBTI 넣기
  const score = MBTI_SCORES[member.mbti]?.['ISTJ']
  return score !== undefined ? score : 'Invalid MBTI types provided'
}

/**
 * 주어진 멤버의 성별을 받아 한글로 변환하는 함수
 * @param {RecommendedMemberEntity} member
 * @returns {gender} 성별
 */
export const transformGenderToKor = (member) => {
  return member.gender === 'MALE' ? '남자' : '여자'
}

/**
 * 주어진 멤버의 mbti와 성별을 받아 아바타 이미지 경로를 반환하는 함수
 * @param {RecommendedMemberEntity} member
 * @returns {imgUrl} 아바타 이미지 경로
 */
export const getMemberAvatarImgUrl = (member) => {
  if (member.gender === 'MALE') {
    return `/images/avatar_MBTI_Male/avatar_${member.mbti}_Male.png`
  } else {
    return `/images/avatar_MBTI_Female/avatar_${member.mbti}_Female.png`
  }
}
