import httpClient from '../httpClient'

// API 레이어: 특정 API 엔드포인트를 호출하는 함수를 정의

export const getRecommendedMembers = async () => {
  const response = await httpClient.get('/member/recommend')
  return response.data
}

export const getMatchedInfoForBanner = async () => {
  const response = await httpClient.get('/matching/banner')
  return response.data
}

export const getMatchingSummary = async () => {
  const response = await httpClient.get('/matching/summary')
  return response
}

// 알림 개수 조회
export const getMatchingNotificationCount = async () => {
  const response = await httpClient.get('/matching/getNotification')
  return response
}

// 알림 목록 조회
export const getMatchingNotificationList = async () => {
  const { data } = await httpClient.get('/matching/getNotificationList')
  return data
}
