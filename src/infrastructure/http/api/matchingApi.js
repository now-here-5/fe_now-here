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

// 하트 보내기
export const postSendHeart = async (receiverId) => {
  const { data } = await httpClient.post(`/matching/send/${receiverId}`)
  return data
}

// 받은 하트 페이지 조회
export const getReceivedHeartList = async () => {
  const { data } = await httpClient.get(`/matching/senderList`)
  return data
}

// 하트 수락하기
export const postReceivedHeart = async (senderId) => {
  const { data } = await httpClient.patch(`/matching/receive/${senderId}`)
  return data
}

// 보낸 하트 페이지 조회
export const getSentHeartList = async () => {
  const { data } = await httpClient.get(`/matching/receiverList`)
  return data
}

// 매칭 현황 페이지 조회
export const getMatchStatusList = async () => {
  const { data } = await httpClient.get(`/matching/summaryDetail`)
  return data
}
